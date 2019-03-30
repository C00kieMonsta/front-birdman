import * as UIActions from './ui.actions';

import { EventInformation } from '../../api/api.model';

export interface UIState {
    eventStack: EventInformation[];
    isLoading: boolean;
    isSidebarReduced: boolean;
    isTopbarReduced: boolean;
    isDesktopSize: boolean;
    isTabletSize: boolean;
    isPhoneSize: boolean;
    isTileEditorReduced: boolean;
}

const initialState: UIState = {
    eventStack: [],
    isLoading: false,
    isSidebarReduced: true,
    isTopbarReduced: true,
    isDesktopSize: null,
    isTabletSize: null,
    isPhoneSize: null,
    isTileEditorReduced: true,
};

export function uiReducer(state = initialState, action: UIActions.UIActions) {
    switch (action.type) {
        case UIActions.actionTypes.ADD_TO_EVENT_STACK:
            const addToEventStackPayload = action.payload as EventInformation;
            return {
                ...state,
                eventStack: [...state.eventStack, addToEventStackPayload]
            };
        case UIActions.actionTypes.REMOVE_FROM_EVENT_STACK:
            return { ...state, eventStack: [...state.eventStack.slice(1, state.eventStack.length)] };
        case UIActions.actionTypes.TOGGLE_TILE_EDITOR:
            const toggleTileEditor = action.payload as boolean;
            return { ...state, isTileEditorReduced: toggleTileEditor };
        case UIActions.actionTypes.TOGGLE_LOADING:
            const toggleLoadingPayload = action.payload as boolean;
            return { ...state, isLoading: toggleLoadingPayload };
        case UIActions.actionTypes.TOGGLE_TABLET_SCREEN_SIZE:
            const toggleTabletScreenSizePayload = action.payload as boolean;
            return { ...state, isTabletSize: toggleTabletScreenSizePayload };
        case UIActions.actionTypes.TOGGLE_DESKTOP_SCREEN_SIZE:
            const toggleDesktopScreenSizePayload = action.payload as boolean;
            return { ...state, isDesktopSize: toggleDesktopScreenSizePayload };
        case UIActions.actionTypes.TOGGLE_PHONE_SCREEN_SIZE:
            const togglePhoneScreenSizePayload = action.payload as boolean;
            return { ...state, isPhoneSize: togglePhoneScreenSizePayload };
        case UIActions.actionTypes.TOGGLE_SIDEBAR:
            const toggleSidebarPayload = action.payload as boolean;
            return { ...state, isSidebarReduced: toggleSidebarPayload };
        case UIActions.actionTypes.TOGGLE_TOPBAR:
            const toggleTopbarPayload = action.payload as boolean;
            return { ...state, isTopbarReduced: toggleTopbarPayload };
        default:
            return state;
    }
}
