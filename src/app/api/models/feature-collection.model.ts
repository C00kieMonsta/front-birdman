import { GeoJson } from './geojson.model';

export class FeatureCollection {
    type = 'FeatureCollection';
    constructor(public features: GeoJson[]) {}
}