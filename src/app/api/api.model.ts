import { Type } from '@angular/core';

export interface BaseEntity {
    hash: string;
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string; 
}

export interface IGeometry {
    type: string;
    coordinates: any;
}

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
