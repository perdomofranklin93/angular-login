import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UbicationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService ) { }

  canActivate(): boolean {
    /**
     * No show the login form is login
     */
    if(this.authService.getJwtToken()) {
      this.router.navigate(['/dashboard'])
      return false;
    }

    return true;
  }

}
