import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { EventsService } from '../events.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them
    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse) {

        const eventsService = this.injector.get(EventsService);

        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                console.log('offline error - ', error);
                eventsService.addToEventStack({
                    message: 'No Internet Connection',
                    eventStatus: 'danger',
                    eventIcon: 'highlight_off',
                    statusCode: error.status,
                    timestamp: new Date(),
                });
            } else {
                // Handle Http Error (error.status === 403, 404...)
                console.log(error);
                eventsService.addToEventStack({
                    message: error.message,
                    eventStatus: 'danger',
                    eventIcon: 'highlight_off',
                    statusCode: error.status,
                    timestamp: new Date(),
                });
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
            console.log('client error - ', error);
            eventsService.addToEventStack({
                message: error.message,
                eventStatus: 'danger',
                eventIcon: 'highlight_off',
                timestamp: new Date(),
            });
        }
    }
}
