import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-ui-switch';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {LoaderComponent} from './loader/loader.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {FilterDropdownItemsPipe} from './pipes/filter-dropdown-items.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    UiSwitchModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SafeHtmlPipe,
    LoaderComponent,
    UiSwitchModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    SafeHtmlPipe,
    LoaderComponent,
    FilterDropdownItemsPipe,
  ],
  providers: []
})
export class SharedModule {}