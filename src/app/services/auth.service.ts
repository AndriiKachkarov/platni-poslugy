import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, Subject, Subscription, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {FbAuthResponse} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sub1: Subscription;

  public error$: Subject<string> = new Subject<string>();
  refreshFlag = false;

  constructor(private http: HttpClient) {
  }

  get token(): string {
    return localStorage.getItem('fb-token');
  }

  login(user): Observable<any> {
    return this.http.post<FbAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response) => {
          this.setToken(response);
        }),
        catchError(this.handleError.bind(this))
      );

  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): Observable<boolean> {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date().getTime() > expDate.getTime() - 60000) {
      if (localStorage.getItem('refresh-token')) {

        if (!this.refreshFlag) {
          this.refreshFlag = true;
          this.sub1 = this.refreshToken().subscribe((res) => {
            this.refreshFlag = false;
            setTimeout(() => {
              this.sub1.unsubscribe();
            }, 0);
            return of(true);
          });
        }
        // return this.refreshToken().pipe(
        //   map((res) => {
        //     console.log(res);
        //     return true;
        //   })
        // );
      } else {
        this.logout();
        return of(null);
      }

    }
    return of(!!this.token);
  }

  // isAuthenticated(): boolean {
  //   const expDate = new Date(localStorage.getItem('fb-token-exp'));
  //   if (new Date() > expDate) {
  //     this.logout();
  //     return null;
  //   }
  //   return !!this.token;
  // }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Введіть коректний email');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Введіть коректний email');

        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Введіть коректний пароль');
        break;

    }
    return throwError(error);
  }

  private setToken(response: FbAuthResponse): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.clear();
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('refresh-token', response.refreshToken);

    } else {
      localStorage.clear();
    }
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh-token');
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };
    return this.http.post<any>(`https://securetoken.googleapis.com/v1/token?key=${environment.apiKey}`, body)
      .pipe(
        tap((response) => {
          const expDate = new Date(new Date().getTime() + +response.expires_in * 1000);
          localStorage.setItem('fb-token', response.id_token);
          localStorage.setItem('fb-token-exp', expDate.toString());
          localStorage.setItem('refresh-token', response.refresh_token);
        }),
        catchError(this.handleError.bind(this))
      );
  }
}
