import { Injectable, EventEmitter } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { of, Observable, concat, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { GeoJson } from '../api/models/geojson.model';
import { map, filter, switchMap, combineLatest, concatMap, mergeMap } from 'rxjs/operators';
import { IGeoJson } from '../api/api.model';
import { UserAdminState } from "../store/user-admin-store/user-admin.reducers";
import { Store } from "@ngrx/store";
import { GlobalState } from "../store/global-state.reducers";


@Injectable({ providedIn: 'root' })
export class MapService {

    public map: Map;
    public changes: EventEmitter<any> = new EventEmitter();
    public _tappedCoordinates = new BehaviorSubject<number[]>(null);

    private userAdminState: Observable<UserAdminState>;

    get tappedCoordinates() {
        return this._tappedCoordinates.asObservable();
    }

    constructor(
        private firestore: AngularFirestore,
        private store: Store<GlobalState>,
    ) {
        (mapboxgl as any).accessToken = environment.mapbox.accessToken;
        this.userAdminState = this.store.select('userAdmin');
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            this._tappedCoordinates.next(coords);
          });
    }

    reload() {
        this.changes.emit();
    }

    createMarker(m: GeoJson) {
        return this.userAdminState.pipe(
            filter((state: UserAdminState) => state.currentUser !== null),
            switchMap((state: UserAdminState) => {
                const markersRef = this.firestore.collection(`users/${state.currentUser.uid}/markers`);
                return markersRef.add({ ...m }).then(res => {
                    // console.log(res);
                });
            })
        );
    }

    removeMarker(k: string) {
        return this.userAdminState.pipe(
            filter((state: UserAdminState) => state.currentUser !== null),
            switchMap((state: UserAdminState) => {
                const markersRef = this.firestore.collection(`users/${state.currentUser.uid}/markers`);
                return markersRef.doc(k).delete();
            })
        );
    }

    getMarkers() {
        const userRef = this.firestore.collection("users");
        return userRef.snapshotChanges().pipe(
            map((actions) => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            }),
            map((snapshots) => {
                const markers = snapshots.map((doc) => {
                    return userRef.doc(doc.id).collection('markers').snapshotChanges().pipe(
                        map((ms) => {
                            return {
                                [`${doc.id}`]: ms.map((m) => {
                                    const data = m.payload.doc.data() as any;
                                    const key = m.payload.doc.id;
                                    return { key, ...data } as IGeoJson;
                                }),
                            }
                        })
                    );
                });
                return markers;
            }),
            combineLatest((obs) => {
                return concat(obs);
            }),
            concatMap(v => v),
            mergeMap(v => v),
        );
    }

    flyTo(center: mapboxgl.LngLatLike) {
        if (this.map) {
            this.map.flyTo({
                center
            });
        }
    }

    updatedTappedCoordinates(coord: number[]) {
        // 0: lon 1: lat
        this._tappedCoordinates.next(coord);
    }
}

