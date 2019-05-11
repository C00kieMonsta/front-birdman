import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { Observable, of } from 'rxjs';

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

  markerForm: FormGroup;
  markers: Observable<IGeoJson[]>;
  markersDict: { [userId: string]: IGeoJson[] };
  currentUser: Observable<User>;
  coordinates: Observable<number[]>;

  constructor(
    private mapService: MapService,
    private homeService: HomeService
  ) {
    this.initForm();
    this.markers = of([]);
    this.markersDict = {};
    this.currentUser = this.homeService.getCurrentUser$();
    this.coordinates = this.mapService._tappedCoordinates;
  }

  ngOnInit() {
    this.mapService.getMarkers().subscribe(c => {
      Object.keys(c).forEach((key: string) => {
        this.markersDict[key] = this.markersDict[key] || [];
        this.markersDict[key] = c[key];
      }); 
    });
  }

  initForm() {
    this.markerForm = new FormGroup({
      'birdType': new FormControl(null, [Validators.required]),
      'message': new FormControl(null),
      'address': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
    });
  }

  removeMarker(key: string) {
    this.mapService.removeMarker(key).subscribe(() => {
      // success
    });
  }

  createNewMarker() {
    if (this.markerForm.valid) {
      this.coordinates.subscribe((coords) => {
        const newMarker = new GeoJson(coords, {
          ...this.markerForm.value,
          message: this.markerForm.get('message').value ? this.markerForm.get('message').value : this.markerForm.get('birdType').value
        });
        this.mapService.createMarker(newMarker).subscribe(() => {
          this.markerForm.reset();
        });
      });
    }
  }

  onFlyToMarker(m: IGeoJson) {
    this.mapService.flyTo(m.geometry.coordinates);
  }


}
