import { Injectable, EventEmitter } from "@angular/core";
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { of, Observable, concat, merge, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { GeoJson } from '../api/models/geojson.model';
import { map, filter, switchMap, combineLatest, concatMap } from 'rxjs/operators';
import { IGeoJson } from '../api/api.model';
import { UserAdminState } from "../store/user-admin-store/user-admin.reducers";
import { Store } from "@ngrx/store";
import { GlobalState } from "../store/global-state.reducers";


@Injectable({ providedIn: 'root' })
export class MapService {

    public map: Map;
    public changes: EventEmitter<any> = new EventEmitter();

    private userAdminState: Observable<UserAdminState>;

    constructor(
        private firestore: AngularFirestore,
        private store: Store<GlobalState>,
    ) {
        (mapboxgl as any).accessToken = environment.mapbox.accessToken;
        this.userAdminState = this.store.select('userAdmin');
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
        console.log('Calling get markers');
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
                    return userRef.doc(doc.id).collection('markers').valueChanges().pipe(
                        map(ms => {
                            return {
                                [`${doc.id}`]: ms
                            }
                        })
                    );
                });
                return markers;
            }),
            combineLatest((obs) => {
                return concat(obs);
            }),
            concatMap(v => v)
        );


        // return userRef.snapshotChanges()
        //     .pipe(
        //         map(actions => {
        //             return actions.map(a => {
        //                 const data = a.payload.doc.data();
        //                 const id = a.payload.doc.id;
        //                 return { id, ...data };
        //             });
        //         })
        //     ).subscribe((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             userRef.doc(doc.id).collection('markers').valueChanges().subscribe(r => {
        //                 console.log(r)
        //             })
        //         });
        //     });
    }

    flyTo(center: mapboxgl.LngLatLike) {
        if (this.map) {
            this.map.flyTo({
                center
            });
        }
    }
}

