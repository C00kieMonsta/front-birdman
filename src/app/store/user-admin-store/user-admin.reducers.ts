import * as UserAdminActions from './user-admin.actions';
import { User } from '../../api/api.model';

export interface UserAdminState {
    currentUser: User;
    currentUserId: string;
}

const initialState: UserAdminState = {
    currentUser: null,
    currentUserId: null,
};

export function userAdminReducer(state = initialState, action: UserAdminActions.UserAdminActions) {
    let payload: any;
    switch (action.type) {
        case UserAdminActions.actionTypes.SET_CURRENT_USER:
            payload = action.payload as User;
            return { ...state, currentUser: payload };
        case UserAdminActions.actionTypes.SET_CURRENT_USER_ID:
            payload = action.payload as string;
            return { ...state, currentUserId: payload };
        case UserAdminActions.actionTypes.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: { ...state.currentUser, isFirstSignIn: false }
            };
        default:
            return state;
    }
}
