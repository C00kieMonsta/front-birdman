import { Injectable, EventEmitter } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { GeoJson } from '../api/models/geojson.model';
import { map } from 'rxjs/operators';
import { IGeoJson } from '../api/api.model';


@Injectable({ providedIn: 'root' })
export class MapService {

    map: Map;
    changes: EventEmitter<any> = new EventEmitter();

    constructor(private firestore: AngularFirestore) {
        (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    }

    reload() {
        this.changes.emit();
    }

    createMarker(m: GeoJson) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('markers')
                .add({...m})
                .then(res => { }, err => reject(err));
        });
    }

    removeMarker(k: string) {
        return this.firestore.collection('markers')
            .doc(k)
            .delete();
    }

    getMarkers() {
        return this.firestore.collection('markers').snapshotChanges().pipe(
            map(markers => {
                return markers.map((m) => {
                    const data = m.payload.doc.data() as any;
                    const key = m.payload.doc.id;
                    return { key, ...data } as IGeoJson;
                });
            })
        );
    }
}

