import { Action } from '@ngrx/store';

import { EventInformation } from '../../api/api.model';

export const actionTypes = {
    ADD_TO_EVENT_STACK: 'ADD_TO_EVENT_STACK',
    REMOVE_FROM_EVENT_STACK: 'REMOVE_FROM_EVENT_STACK',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    TOGGLE_DESKTOP_SCREEN_SIZE: 'TOGGLE_DESKTOP_SCREEN_SIZE',
    TOGGLE_TABLET_SCREEN_SIZE: 'TOGGLE_TABLET_SCREEN_SIZE',
    TOGGLE_PHONE_SCREEN_SIZE: 'TOGGLE_PHONE_SCREEN_SIZE',
    TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
    TOGGLE_TOPBAR: 'TOGGLE_TOPBAR',
    TOGGLE_TILE_EDITOR: 'TOGGLE_TILE_EDITOR',
};

export class AddToEventStack implements Action {
    readonly type: string = actionTypes.ADD_TO_EVENT_STACK;
    constructor(public payload: EventInformation) {}
}

export class RemoveFromEventStack implements Action {
    readonly type: string = actionTypes.REMOVE_FROM_EVENT_STACK;
    constructor(public payload?: any) {}
}

export class ToggleTileEditor implements Action {
    readonly type: string = actionTypes.TOGGLE_TILE_EDITOR;
    constructor(public payload: boolean) {}
}

export class ToggleLoading implements Action {
    readonly type: string = actionTypes.TOGGLE_LOADING;
    constructor(public payload: boolean) {}
}

export class ToggleDesktopScreenSize implements Action {
    readonly type: string = actionTypes.TOGGLE_DESKTOP_SCREEN_SIZE;
    constructor(public payload: boolean) {}
}

export class ToggleTabletScreenSize implements Action {
    readonly type: string = actionTypes.TOGGLE_TABLET_SCREEN_SIZE;
    constructor(public payload: boolean) {}
}

export class TogglePhoneScreenSize implements Action {
    readonly type: string = actionTypes.TOGGLE_PHONE_SCREEN_SIZE;
    constructor(public payload: boolean) {}
}

export class ToggleSidebar implements Action {
    readonly type: string = actionTypes.TOGGLE_SIDEBAR;
    constructor(public payload: boolean) {}
}

export class ToggleTopbar implements Action {
    readonly type: string = actionTypes.TOGGLE_TOPBAR;
    constructor(public payload: boolean) {}
}

// Bundeling all actions
export type UIActions = AddToEventStack
    | RemoveFromEventStack
    | ToggleTileEditor
    | ToggleSidebar
    | ToggleTopbar
    | ToggleDesktopScreenSize
    | ToggleTabletScreenSize
    | TogglePhoneScreenSize;
