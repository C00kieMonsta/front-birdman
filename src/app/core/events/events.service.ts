import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventInformation, ServerError } from '../../api/api.model';
import { GlobalState } from '../../store/global-state.reducers';
import { UIState } from '../../store/ui-store/ui.reducers';
import { AddToEventStack, RemoveFromEventStack } from '../../store/ui-store/ui.actions';


@Injectable()
export class EventsService {

  private uiState: Observable<UIState>;

  constructor(private store: Store<GlobalState>) {
    this.uiState = this.store.select('ui');
  }

  //
  // OBSERVABLES$
  //

  public getEventStack$(): Observable<EventInformation[]> {
    return this.uiState.pipe(map((uiState: UIState) => {
      if (uiState.eventStack) {
        return uiState.eventStack;
      } else {
        return [];
      }
    }));
  }

  //
  // OTHERS
  //

  public addToEventStack(eventInfo: EventInformation): void {
    this.store.dispatch(new AddToEventStack(eventInfo));
  }

  public removeFromEventStack(): void {
    this.store.dispatch(new RemoveFromEventStack());
  }

  public addContextInfoToError(error: HttpErrorResponse, message?: string): ServerError {
    return {
      name: error.name,
      date: new Date(),
      url: error.url,
      status: error.status || null,
      message: message || error.message || error.toString(),
    };
  }

}
