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

    // data
    source: any;

    constructor(private mapService: MapService) {
        this.markers = [];
        this.isMoving = false;
        this.style = 'mapbox://styles/mapbox/streets-v11';
        this.lat = 0;
        this.lng = 0;
        this.timeLeft = 1.5;
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
            zoom: 15,
            center: [this.lng, this.lat],
        });
        this.mapService.map = this.map;

        this.map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
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
            setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft -= 0.5;
                }
            }, 500);
        });

        this.map.on('touchmove', () => {
            this.isMoving = true;
        });

        this.map.on('touchend', (event) => {
            if (this.timeLeft === 0 && !this.isMoving) {
                const coords = [event.lngLat.lng, event.lngLat.lat];
                this.mapService.updatedTappedCoordinates(coords);
                this.triggerModal.emit(coords);
            }
            this.timeLeft = 1.5;
            this.isMoving = false;
        });

        this.map.on('mousedown', (event) => {
            setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft -= 0.5;
                }
            }, 500);
        });

        this.map.on('mousemove', () => {
            this.isMoving = true;
        });

        this.map.on('mouseup', (event) => {
            if (this.timeLeft === 0 && !this.isMoving) {
                const coords = [event.lngLat.lng, event.lngLat.lat];
                this.mapService.updatedTappedCoordinates(coords);
                this.triggerModal.emit(coords);
            }
            this.timeLeft = 1.5;
            this.isMoving = false;
        });

        this.map.on('load', (event) => {

            // disable scroll
            this.mapService.map.scrollZoom.disable();

            this.setSourceData();

            this.setMarkerStyling();

        });
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
                let data = new FeatureCollection(this.markers);
                this.source.setData(data);
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
                // 'text-size': 24,
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
        })
    }

}
