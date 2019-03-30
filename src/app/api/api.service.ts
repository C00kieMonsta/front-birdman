import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BaseEntity } from './api.model';
import { Dtos } from './api.dto';

@Injectable()
export class ApiService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.serverUrl;
    }

    public get(endPoint: string): Observable<BaseEntity[] | BaseEntity | any> {
        return this.http.get(encodeURI(this.apiUrl + endPoint)).pipe(
            map((data: BaseEntity[] | BaseEntity) => data)
        );
    }

    public download(endPoint: string): Observable<any> {
        return this.http.get(encodeURI(this.apiUrl + endPoint), { responseType: 'arraybuffer' });
    }

    public upload(endPoint: string, payload: any): Observable<any> {
        const req = new HttpRequest('POST', this.apiUrl + endPoint, payload, {reportProgress: true});
        return this.http.request(req);
    }

    public create(endPoint: string, payload?: Dtos | any): Observable<BaseEntity | BaseEntity[] | any> {
        return this.http.post(encodeURI(this.apiUrl + endPoint), payload).pipe(
            map((data: BaseEntity) => data)
        );
    }

    public delete(endPoint: string): Observable<boolean> {
        return this.http.delete(encodeURI(this.apiUrl + endPoint)).pipe(
            map((deleteResult: boolean) => deleteResult)
        );
    }

    public update(endPoint: string, payload?: Dtos | any): Observable<BaseEntity | any> {
        return this.http.put(encodeURI(this.apiUrl + endPoint), payload).pipe(
            map((data: BaseEntity) => data)
        );
    }
}
