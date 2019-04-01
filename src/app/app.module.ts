import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/global-state.reducers';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OutModule } from './out/out.module';

const config = {
  apiKey: "AIzaSyB6WTo9lchdJEwzaeVDNj13PcD4u6eL-Gw",
  authDomain: "birdman-firebase.firebaseapp.com",
  databaseURL: "https://birdman-firebase.firebaseio.com",
  projectId: "birdman-firebase",
  storageBucket: "birdman-firebase.appspot.com",
  messagingSenderId: "449207344875"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AuthenticationModule.forRoot(),
    HomeModule,
    CoreModule,
    OutModule,
    AppRoutingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
