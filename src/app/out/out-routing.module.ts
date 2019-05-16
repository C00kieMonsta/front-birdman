import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { InfoCardComponent } from './info-card/info-card.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'info', component: InfoCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutRoutingModule { }
