import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { HomeComponent } from './home/home.component';

// remove shell here because everybody has access to this section
const homeRoutes: Routes = Route.withShell([
  { path: '', component: HomeComponent },
]);

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule { }
