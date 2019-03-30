import { Action } from '@ngrx/store';
import { User } from '../../api/api.model';

export const actionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_CURRENT_USER_ID: 'SET_CURRENT_USER_ID',
    UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER'
};

export class SetCurrentUser implements Action {
    readonly type: string = actionTypes.SET_CURRENT_USER;
    constructor(public payload: User) {}
}

export class SetCurrentUserId implements Action {
    readonly type: string = actionTypes.SET_CURRENT_USER_ID;
    constructor(public payload: string) {}
}

export class UpdateCurrentUser implements Action {
    readonly type: string = actionTypes.UPDATE_CURRENT_USER;
    constructor(public payload: boolean) {}
}

// Bundeling all actions
export type UserAdminActions = SetCurrentUserId
    | SetCurrentUser
    | UpdateCurrentUser;
