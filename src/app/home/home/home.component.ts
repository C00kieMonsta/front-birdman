import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  markers: any;
  latitude: number;
  longitude: number;
  map: any;
  markerForm: FormGroup;

  constructor() {
    this.markers = [];
    this.initForm();
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.updateForm(position.coords.latitude, position.coords.longitude);
        this.setCenter();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

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

  setCenter() {
    // todo
  }

  addMarker() {
    // todo
  }

}
