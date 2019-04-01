import { Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      canActivateChild: [AuthenticationGuard]
    }];
  }

}
