import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly ID_USER = 'ID_USER';

  constructor( private httpClient: HttpClient ) { }

  logIn( data: any ): Observable<any> {
    return this.httpClient.post<any>( 'https://reqres.in/api/login', data );
  }

  logOut() {
    this.removeIdUser();
    this.removeTokens();
  }

  /**
   * ID User methods
   */

  saveIdUser(id: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(this.ID_USER, id);
      localStorage.setItem(this.ID_USER, id);
    } else {
      sessionStorage.setItem(this.ID_USER, id);
      sessionStorage.setItem(this.ID_USER, id);
    }
  }

  removeIdUser() {
    localStorage.removeItem(this.ID_USER);
    sessionStorage.removeItem(this.ID_USER);
  }

  /**
   * Tokens methods
   */

  // Execute request refresh token to the back
  refreshToken() {
    return this.httpClient.post<any>(`auth/refresh`, {}).pipe(
      tap(tokens => {
        this.storeJwtToken(tokens.access_token);
      })
    );
  }


  getJwtToken() {
    return localStorage.getItem(this.ACCESS_TOKEN)
      ? localStorage.getItem(this.ACCESS_TOKEN)
      : sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN)
      ? localStorage.getItem(this.REFRESH_TOKEN)
      : sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  /**
   * Save the refreshed token
   */
  private storeJwtToken(jwt: string) {
    localStorage.getItem(this.ACCESS_TOKEN)
      ? localStorage.setItem(this.ACCESS_TOKEN, jwt)
      : sessionStorage.setItem(this.ACCESS_TOKEN, jwt);
  }

  /**
   * Save token
   */
  storeTokens(tokens, rememberMe: boolean) {
    if (rememberMe) {
      console.log(rememberMe)
      localStorage.setItem(this.ACCESS_TOKEN, tokens);
      //localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
    } else {
      sessionStorage.setItem(this.ACCESS_TOKEN, tokens);
      //sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
    }
  }

  removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }
}
