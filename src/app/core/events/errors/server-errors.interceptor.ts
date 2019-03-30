import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { EventsService } from '../events.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private eventsService: EventsService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userError;
        return next
            .handle(request)
            .pipe(tap((event: HttpEvent<any>) => { },
                (error: any) => {
                    console.log(error);
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 404:
                                console.log(error);
                                this.router.navigate(['/error'], { queryParams: userError });
                                break;
                            case 401:
                                userError = this.eventsService.addContextInfoToError(error, 'Unauthorized');
                                // if (!this.authService.isAuthenticated() || error.message === 'jwt expired') {
                                //     this.authService.deleteLocalStorage();
                                // }
                                this.router.navigate(['/error'], { queryParams: userError });
                                break;
                            case 403:
                                userError = this.eventsService.addContextInfoToError(error, 'Forbidden');
                                this.router.navigate(['/error'], { queryParams: userError });
                                break;
                            case 500:
                                this.router.navigate(['/error'], { queryParams: userError });
                                console.log(error);
                                break;
                            case 0:
                                userError = this.eventsService.addContextInfoToError(error, 'ERR_CONNECTION_REFUSED - Server is down');
                                // this.authService.deleteLocalStorage();
                                this.router.navigate(['/error'], { queryParams: userError });
                                break;
                            default:
                                userError = this.eventsService.addContextInfoToError(error, 'UNKNOWN ERROR');
                                // this.authService.deleteLocalStorage();
                                this.router.navigate(['/error'], { queryParams: userError });
                                break;
                        }
                    } else {
                        console.log(error);
                    }
                }
            )
            );
    }
}
