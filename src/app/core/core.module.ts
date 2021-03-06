import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ShellComponent } from './shell/shell.component';
import { ApiService } from '../api/api.service';
import { ShellService } from './shell/shell.service';
import {HeaderComponent} from './shell/header/header.component';
import {TopbarComponent} from './shell/header/topbar/topbar.component';
import { PageNotFoundComponent } from './events/errors/page-not-found/page-not-found.component';
import { PageErrorComponent } from './events/errors/page-error/page-error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    // RouterModule.forChild(Route.withShell([
    //   { path: '**', component: PageNotFoundComponent },
    // ])),
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    TopbarComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  providers: [
    ApiService,
    ShellService,
  ]
})
export class CoreModule {}
