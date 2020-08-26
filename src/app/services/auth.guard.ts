import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}


  // canActivate(route: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot
  // ): Observable<boolean> | boolean {
  //     if (this.auth.isAuthenticated()) {
  //       return true;
  //     } else {
  //       this.auth.logout();
  //       this.router.navigate(['login'], {
  //         queryParams: {
  //           loginAgain: true
  //         }
  //       });
  //     }
  // }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.isAuthenticated()
      .pipe(
        tap((res) => {
          if (res) {
            return true;
          } else {
            this.auth.logout();
            this.router.navigate(['login'], {
              queryParams: {
                loginAgain: true
              }
            });
          }
        })
      );

  }

}
