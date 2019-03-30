import { Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: ShellComponent,
      children: routes,
    }];
  }

}
