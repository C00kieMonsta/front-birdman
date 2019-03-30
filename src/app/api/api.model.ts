import { Type } from '@angular/core';

export interface BaseEntity {
    hash: string;
}

/******************************************************
 *
 *                  Internal Model
 *
 ******************************************************/

export interface User extends BaseEntity {
    firstName: string;
    lastName: string;
    userId: string;
    provider: string;
    dateJoined: Date;
    email: string;
    tags: string;
    bio: string;
}

/******************************************************
 *
 *                  Universal Model
 *
 ******************************************************/


/******************************************************
 *
 *                  Event Model
 *
 ******************************************************/

type EventStatusType = 'danger' | 'success' | 'info' | 'warning';

type EventIconType = 'check' | 'info' | 'warning' | 'highlight_off';

export interface EventInformation {
    timestamp: Date;
    message: string;
    eventStatus: EventStatusType;
    eventIcon: EventIconType;
    statusCode?: number;
    link?: string;
}

/******************************************************
 *
 *                  Server Error
 *
 ******************************************************/

export interface ServerError {
    name: string;
    date: Date;
    url: string;
    status: number;
    message: string;
}


/******************************************************
 *
 *                  Shared Interface
 *
 ******************************************************/

export interface DropdownItem {
    id: string;
    value: any;
    label: string;
    checked: boolean;
    category?: string;
}
