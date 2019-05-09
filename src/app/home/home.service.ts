import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { GlobalState } from '../store/global-state.reducers';
import { UserAdminState } from '../store/user-admin-store/user-admin.reducers';

@Injectable()
export class HomeService {

    private userAdminState: Observable<UserAdminState>;

    constructor(
        private apiService: ApiService,
        private store: Store<GlobalState>,
    ) {
        this.userAdminState = this.store.select('userAdmin');
    }

    getCurrentUser$(): Observable<User> {
        return this.userAdminState.pipe(
            filter((state: UserAdminState) => state.currentUser !== null),
            map((state: UserAdminState) => state.currentUser),
        );
    }

}
