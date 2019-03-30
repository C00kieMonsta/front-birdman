import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { GlobalState } from '../store/global-state.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class HomeService {

    constructor(
        private apiService: ApiService,
        private store: Store<GlobalState>,
    ) {}

}
