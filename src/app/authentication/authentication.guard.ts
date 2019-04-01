import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';

import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.router.navigate(['/welcome'], {replaceUrl: true});
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

}
