import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { Observable, of, combineLatest } from 'rxjs';

import { MapService } from '../../shared/map.service';
import { IGeoJson } from '../../api/api.model';
import { GeoJson } from '../../api/models/geojson.model';
import { HomeService } from '../home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    birdTypes: string[];
    markerForm: FormGroup;
    markers: Observable<IGeoJson[]>;
    markersDict: { [userId: string]: IGeoJson[] };
    currentUser: Observable<User>;
    coordinates: Observable<number[]>;

    private cancelButton: HTMLElement;

    constructor(
        private mapService: MapService,
        private homeService: HomeService,
        private eleRef: ElementRef,
    ) {
        this.birdTypes = ['moineau'];
        this.markers = of([]);
        this.markersDict = {};
        this.currentUser = this.homeService.getCurrentUser$();
        this.coordinates = this.mapService.tappedCoordinates;
    }

    ngOnInit() {
        this.initForm();
        this.cancelButton = this.eleRef.nativeElement.querySelector('#newMarkerModalCancel');
        this.mapService.getMarkers().subscribe(c => {
            Object.keys(c).forEach((key: string) => {
                this.markersDict[key] = this.markersDict[key] || [];
                this.markersDict[key] = c[key];
            });
        });
    }

    initForm() {
        this.markerForm = new FormGroup({
            birdType: new FormControl(this.birdTypes[0], [Validators.required]),
            message: new FormControl(null),
            // address: new FormControl(null, [Validators.required]),
            // city: new FormControl(null, [Validators.required]),
        });
    }

    removeMarker(key: string) {
        this.mapService.removeMarker(key).subscribe(() => {
            // success
        });
    }

    reportMarker(key: string) {
        //
    }

    createNewMarker() {
        if (this.markerForm.valid) {
            const combined = combineLatest(
                this.coordinates,
                this.currentUser,
            );
            combined.subscribe((states: [number[], User]) => {
                const newMarker = new GeoJson(states[0], {
                    ...this.markerForm.value,
                    message: this.markerForm.get('message').value ? this.markerForm.get('message').value : this.markerForm.get('birdType').value,
                    author: states[1].email,
                });
                this.mapService.createMarker(newMarker).subscribe(() => {
                    this.markerForm.reset();
                });
            });
            this.cancelButton.click();
        }
    }

    onFlyToMarker(m: IGeoJson) {
        this.mapService.flyTo(m.geometry.coordinates);
    }

    triggerModal(event) {
        document.getElementById('openModalButton').click();
    }

}
