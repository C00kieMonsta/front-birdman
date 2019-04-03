import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latitude: number;
  longitude: number;
  map: any;

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.setCenter();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  setCenter() {
    // todo
  }

  addMarker() {
    // todo
  }

}
