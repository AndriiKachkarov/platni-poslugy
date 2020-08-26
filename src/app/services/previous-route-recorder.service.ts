import {Injectable} from '@angular/core';
import {CanDeactivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PreviousRouteRecorderService implements CanDeactivate<any> {
  constructor(private router: Router) {
  }
  canDeactivate(component: any): Observable<boolean> | boolean {
    localStorage.setItem('previousRoute', this.router.url);
    return true;
  }
}
