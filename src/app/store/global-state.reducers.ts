import { ActionReducerMap } from '@ngrx/store';

import * as UIReducers from './ui-store/ui.reducers';
import * as UserAdminReducers from './user-admin-store/user-admin.reducers';

export interface GlobalState {
    ui: UIReducers.UIState;
    userAdmin: UserAdminReducers.UserAdminState;
}

export const reducers: ActionReducerMap<GlobalState> = {
    ui: UIReducers.uiReducer,
    userAdmin: UserAdminReducers.userAdminReducer,
};
