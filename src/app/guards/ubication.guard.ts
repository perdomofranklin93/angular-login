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

    // const ubication = this.authService.getJwtToken() ? true : false;

    // if( !ubication ) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    // this.router.navigate(['/dashboard']);
    return true;
  }

}
