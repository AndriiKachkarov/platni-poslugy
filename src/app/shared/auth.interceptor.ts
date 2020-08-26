import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.isAuthenticated().pipe(
      switchMap((res) => {
        if (res) {
          request = request.clone({
            setParams: {
              auth: this.auth.token
            }
          });
        }
        return next.handle(request)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              console.log('[Interceptor Error]', err);
              if (err.status === 401) {
                this.auth.logout();
                this.router.navigate(['login'], {
                  queryParams: {
                    authFailed: true
                  }
                });
              }
              return throwError(err);
            })
          );
      })
    );
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.auth.isAuthenticated()) {
  //     request = request.clone({
  //       setParams: {
  //         auth: this.auth.token
  //       }
  //     });
  //   }
  //   return next.handle(request)
  //     .pipe(
  //       catchError((err: HttpErrorResponse) => {
  //         console.log('[Interceptor Error]', err);
  //         if (err.status === 401) {
  //           this.auth.logout();
  //           this.router.navigate(['login'], {
  //             queryParams: {
  //               authFailed: true
  //             }
  //           });
  //         }
  //         return throwError(err);
  //       })
  //     );
  // }
}
