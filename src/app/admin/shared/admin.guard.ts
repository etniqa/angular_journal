import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private authService: AuthService,
              private router: Router) {
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.typeOfUser);
    if (this.authService.typeOfUser === 'admin') {
      return true;
    } else {
      console.log('reject');
      this.router.navigate(['/login'], {
        queryParams: {
          isFakeAccess: true
        }
      });
      return false;
    }
  }
}
