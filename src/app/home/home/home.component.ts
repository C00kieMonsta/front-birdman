import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from '../../shared/map.service';
import { Observable } from 'rxjs';
import { IGeoJson } from 'src/app/api/api.model';
import { GeoJson } from 'src/app/api/models/geojson.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  markerForm: FormGroup;
  markers: Observable<IGeoJson[]>;
  lat: number;
  lng: number;

  constructor(private mapService: MapService) {
    this.initForm();
    this.markers = this.mapService.getMarkers();
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
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
    this.mapService.removeMarker(key);
  }

  createNewMarker() {
    if (this.markerForm.valid) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.longitude, position.coords.latitude];
        const newMarker = new GeoJson(coords, {
          ...this.markerForm.value,
          message: this.markerForm.get('message').value ? this.markerForm.get('message').value : this.markerForm.get('birdType').value
        });
        this.mapService.createMarker(newMarker);
        this.markerForm.reset();
      });
    }
  }

  onFlyToMarker(m: IGeoJson) {
    this.mapService.flyTo(m.geometry.coordinates);
  }


}
