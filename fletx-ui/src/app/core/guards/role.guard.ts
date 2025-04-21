import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const requiredPermissions = route.data['permissions'] as
      | string[]
      | undefined;
    console.log(requiredPermissions);
    if (!requiredPermissions || this.auth.hasPermission(requiredPermissions)) {
      return true;
    }

    return this.router.createUrlTree(['/forbidden']);
  }
}
