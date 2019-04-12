import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { MapService } from '../map.service';
import { GeoJson } from '../../api/models/geojson.model';
import { FeatureCollection } from '../../api/models/feature-collection.model';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.sass']
})
export class MapboxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 0;
  lng = 0;

  // data
  source: any;
  markers: Observable<any>;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.markers = of([]);
    this.initializeMap();
  }

  initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
        })
      });
    }
    this.buildMap();
  }

  buildMap() {

    // basic config
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });


    // adding controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (event) => {
      const coords = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coords, { message: 'New marker' });
      this.mapService.createMarker(newMarker);
    });

    this.map.on('load', (event) => {
      // register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          features: [],
          type: 'FeatureCollection'
        }
      });
    });

    this.source = this.map.getSource('firebase');

    this.markers.subscribe(ms => {
      let data  = new FeatureCollection(ms);
      this.source.setData(data);
    });

    // define styling for markers
    this.map.addLayer({
      id: 'firebase',
      source: 'firebase',
      type: 'symbol',
      layout: {
        'text-field': '{message}',
        'text-size': 24,
        'text-transform': 'uppercase',
        'icon-image': 'rocket-15',
        'text-offset': [0, 1.5]
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2
      }
    });

  }

  // helpers
  removeMarker(m) {
    this.mapService.removeMarker(m.$key);
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

}
