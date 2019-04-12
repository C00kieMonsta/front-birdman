import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from 'ngx-mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { Observable, of } from 'rxjs';
import { GeoJson } from 'src/app/api/models/geojson.model';
import { FeatureCollection } from 'src/app/api/models/feature-collection.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number;
  lng: number;
  center: any;
  map: mapboxgl.Map;;
  markerForm: FormGroup;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  // data
  source: any;
  markers: Observable<any>;

  constructor(private mapService: MapService) {
    this.markers = of([]);
    this.center = [-74.50, 40];
    this.initForm();
  }

  ngOnInit() {
    this.initializeMap();
  }

  initForm() {
    this.markerForm = new FormGroup({
      'birdType': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'latitude': new FormControl(null, [Validators.required]),
      'longitude': new FormControl(null, [Validators.required]),
    });
  }

  updateForm(lat: number, lon: number) {
    this.markerForm = new FormGroup({
      'birdType': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'city': new FormControl(false, [Validators.required]),
      'latitude': new FormControl(lat, [Validators.required]),
      'longitude': new FormControl(lon, [Validators.required]),
    });
  }


  initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.updateForm(position.coords.latitude, position.coords.longitude);
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
      // this.mapService.createMarker(newMarker);
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

  setCenter(lat, lng) {
    const center: mapboxgl.LngLatLike = {lng, lat}
    this.map.setCenter(center)
  }

  addMarker() {
    // this.map.get
  }

}
