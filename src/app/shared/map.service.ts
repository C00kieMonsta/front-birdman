import { Injectable } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';

import { environment } from '../../environments/environment';
import { GeoJson } from '../api/models/geojson.model';


@Injectable({ providedIn: 'root' })
export class MapService {
    
    constructor() {
        Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    }

    createMarker(m: GeoJson) {}
    
    removeMarker(k: string) {}
}