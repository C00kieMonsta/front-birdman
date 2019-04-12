import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from '../../shared/map.service';
import { Observable } from 'rxjs';
import { IGeoJson } from 'src/app/api/api.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  markerForm: FormGroup;
  markers: Observable<IGeoJson[]>;

  constructor(private mapService: MapService) {
    this.initForm();
    this.markers = this.mapService.getMarkers();
  }
  
  ngOnInit() {}

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

  removeMarker(key: string) {
    this.mapService.removeMarker(key);
  }


}
