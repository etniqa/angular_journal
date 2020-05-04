import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivateChild {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.typeOfUser === 'teacher') {
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
