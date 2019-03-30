import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlobalState } from '../../store/global-state.reducers';
import { UpdateCurrentUser } from '../../store/user-admin-store/user-admin.actions';
import { UIState } from '../../store/ui-store/ui.reducers';
import { ApiService } from '../../api/api.service';

@Injectable()
export class ShellService {

  private uiState: Observable<UIState>;

  constructor(
    private store: Store<GlobalState>,
    private apiService: ApiService,
  ) {
    this.uiState = this.store.select('ui');
  }

  //
  // OBSERVABLES$
  //

  public isLoading$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isLoading));
  }

}
