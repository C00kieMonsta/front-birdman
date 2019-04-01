import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './shell/shell.component';
import { ApiService } from '../api/api.service';
import { ShellService } from './shell/shell.service';
import {HeaderComponent} from './shell/header/header.component';
import {TopbarComponent} from './shell/header/topbar/topbar.component';
import { Route } from './route.service';
import { PageNotFoundComponent } from './events/errors/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Route.withShell([
      { path: '**', component: PageNotFoundComponent },
    ])),
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    TopbarComponent,
    PageNotFoundComponent,
  ],
  providers: [
    ApiService,
    ShellService,
  ]
})
export class CoreModule {}
