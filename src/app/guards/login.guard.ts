import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private store: Store ) {}

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    return isAuthenticated;
  }

}
