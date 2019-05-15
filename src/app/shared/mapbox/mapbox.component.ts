import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from 'mapbox-gl-geocoder';

import { MapService } from '../map.service';
import { GeoJson } from '../../api/models/geojson.model';
import { FeatureCollection } from '../../api/models/feature-collection.model';
import { IGeoJson } from '../../api/api.model';



@Component({
    selector: 'app-mapbox',
    templateUrl: './mapbox.component.html',
    styleUrls: ['./mapbox.component.sass']
})
export class MapboxComponent implements OnInit {

    @Output() triggerModal = new EventEmitter<any>();

    map: mapboxgl.Map;
    markers: IGeoJson[];
    style: string;
    lat: number;
    lng: number;
    timeLeft: number;
    isMoving: boolean;
    interval;
    timeout;

    // data
    source: any;

    constructor(private mapService: MapService) {
        this.markers = [];
        this.isMoving = false;
        this.style = 'mapbox://styles/mapbox/streets-v11';
        this.lat = 0;
        this.lng = 0;
        this.timeLeft = 1;
    }

    ngOnInit() {
        this.initializeMap();
    }

    initializeMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.map.flyTo({
                    center: [this.lng, this.lat],
                });
            });
        }
        this.buildMap();
    }

    buildMap() {

        // basic config
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 15,
            center: [this.lng, this.lat],
        });
        this.mapService.map = this.map;

        this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
        }));

        // adding controls
        this.map.addControl(new mapboxgl.NavigationControl());

        // track user
        // Add geolocate control to the map.
        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        this.map.on('touchstart', (event) => {
            if (event.touches.length === 1) {
                this.updateCoords(event);
            }
        });

        this.map.on('mousedown', (event) => {
            this.updateCoords(event);
        });

        this.map.on('move', () => {
            this.resetTimer();
        });

        this.map.on('pitch', (event) => {
            this.resetTimer();
        });

        this.map.on('zoom', (event) => {
            this.resetTimer();
        });

        this.map.on('touchend', (event) => {
            this.resetTimer();
        });

        this.map.on('mouseup', (event) => {
            this.resetTimer();
        });

        this.map.on('load', (event) => {

            // disable scroll
            this.mapService.map.scrollZoom.disable();
            this.setSourceData();
            this.setMarkerStyling();

        });
    }

    updateCoords(event) {
        this.timeout = setTimeout(() => {
            const coords = [event.lngLat.lng, event.lngLat.lat];
            this.mapService.updatedTappedCoordinates(coords);
            this.triggerModal.emit(coords);
        }, 1000);
    }

    resetTimer() {
        clearTimeout(this.timeout);
    }

    setSourceData() {
        // register source
        this.map.addSource('firebase', {
            type: 'geojson',
            data: {
                features: [],
                type: 'FeatureCollection'
            }
        });

        this.source = this.map.getSource('firebase');

        this.mapService.getMarkers().subscribe(c => {
            Object.keys(c).forEach((key: string) => {
                this.markers.push(...c[key]);
                const data = new FeatureCollection(this.markers);
                this.source.setData(data);
                data.features.forEach((marker) => {
                    // create a DOM element for the marker
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.style.backgroundImage = 'url(assets/brand/icon.svg)';
                    el.style.width = '30px';
                    el.style.height = '30px';

                    el.addEventListener('click', () => {
                        window.alert(marker.properties.message);
                    });

                    // add marker to map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(this.map);
                });
            });
        });


    }

    setMarkerStyling() {
        // define styling for markers
        this.map.addLayer({
            id: 'firebase',
            source: 'firebase',
            type: 'symbol',
            layout: {
                // 'text-field': '{message}',
                'text-size': 24,
                // 'text-transform': 'uppercase',
                'icon-image': 'rocket-15',
                // 'text-offset': [0, 1.5]
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
        });
    }

}
