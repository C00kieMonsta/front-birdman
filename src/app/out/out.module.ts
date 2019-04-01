import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome/welcome.component';
import { OutRoutingModule } from './out-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        WelcomeComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        OutRoutingModule,
        SharedModule,
    ],
})
export class OutModule {}
