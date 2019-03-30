import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WelcomeComponent } from './onboarding/onboarding-components/welcome/welcome.component';
import { GlobalState } from '../../store/global-state.reducers';
import { UpdateCurrentUser } from '../../store/user-admin-store/user-admin.actions';
import { UIState } from '../../store/ui-store/ui.reducers';
import { OnboardingState } from '../../store/onboarding-store/onboarding.reducers';
import { UpdateSelectedIndex } from '../../store/onboarding-store/onboarding.actions';
import { ApiService } from '../../api/api.service';
import { paths } from '../../shared/globals';

@Injectable()
export class ShellService {

  private uiState: Observable<UIState>;
  private onboardingState: Observable<OnboardingState>;

  private adminOnboardingComponents: any[] = [
    WelcomeComponent,
  ];

  constructor(
    private store: Store<GlobalState>,
    private apiService: ApiService,
  ) {
    this.uiState = this.store.select('ui');
    this.onboardingState = this.store.select('onboarding');
  }

  //
  // OBSERVABLES$
  //

  public isLoading$(): Observable<boolean> {
    return this.uiState.pipe(map((uiState: UIState) => uiState.isLoading));
  }

  public getSelectedIndex$(): Observable<number> {
    return this.onboardingState.pipe(
      map((onboardingState: OnboardingState) => onboardingState.selectedIndex),
    );
  }

  //
  // UPDATE
  //

  public updateUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.update(`${paths.USERS}`, { isFirstSignIn: false }).subscribe(() => {
        this.store.dispatch(new UpdateCurrentUser(false));
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  //
  // OTHERS
  //

  public getOnboardingComponent(index: number): any {
    return this.adminOnboardingComponents[index];
  }

  public getNumberOfOnboardingComponents(): number {
    return this.adminOnboardingComponents.length;
  }

  public updateSelectedIndex(amount: number): void {
    this.store.dispatch(new UpdateSelectedIndex(amount));
  }

}
