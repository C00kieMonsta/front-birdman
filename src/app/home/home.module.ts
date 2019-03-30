import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    providers: [
        HomeService,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
    ],
})
export class HomeModule { }
