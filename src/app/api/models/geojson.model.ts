import { IGeoJson, IGeometry } from '../api.model';

export class GeoJson implements IGeoJson {
    type = 'feature';
    geometry: IGeometry

    constructor(coordinates, public properties?) {
        this.geometry = {
            type: 'Point',
            coordinates,
        }
    }
}