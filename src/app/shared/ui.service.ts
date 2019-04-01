import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UIState } from '../store/ui-store/ui.reducers';
import { GlobalState } from '../store/global-state.reducers';
import { ToggleDesktopScreenSize, ToggleTabletScreenSize, ToggleTopbar, TogglePhoneScreenSize } from '../store/ui-store/ui.actions';



@Injectable({ providedIn: 'root' })
export class UIService {

  private uiState: Observable<UIState>;

  constructor(private store: Store<GlobalState>) {
    this.uiState = this.store.select('ui');
  }

  //
  // OBSERVABLES$
  //

  public isDesktopSize$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isDesktopSize));
  }

  public isTabletSize$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isTabletSize));
  }

  public isPhoneSize$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isPhoneSize));
  }

  public isTopbarReduced$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isTopbarReduced));
  }

  public isLoading$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isLoading));
  }


  //
  // OTHERS
  //

  public toggleDesktopScreenSize(isDesktop: boolean): void {
    this.store.dispatch(new ToggleDesktopScreenSize(isDesktop));
  }

  public toggleTabletScreenSize(isTablet: boolean): void {
    this.store.dispatch(new ToggleTabletScreenSize(isTablet));
  }

  public toggleTopbar(show: boolean): void {
    this.store.dispatch(new ToggleTopbar(show));
  }

  public togglePhoneScreenSize(isSmall: boolean): void {
    this.store.dispatch(new TogglePhoneScreenSize(isSmall));
  }

}
