// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB6WTo9lchdJEwzaeVDNj13PcD4u6eL-Gw",
    authDomain: "birdman-firebase.firebaseapp.com",
    databaseURL: "https://birdman-firebase.firebaseio.com",
    projectId: "birdman-firebase",
    storageBucket: "birdman-firebase.appspot.com",
    messagingSenderId: "449207344875"
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYzAwa2llbW9uc3RhIiwiYSI6ImNqdTE5aDR5dTBzNWU0MHA5d2dqZzZ5N3IifQ.N0WyM7_ooH9F4Aqr0yfz-A'
  },
  appVersion: require('../../package.json').version
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
