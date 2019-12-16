import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient: HttpClient ) {

  }

  logIn( data: any ) : Observable<any> {
    return this.httpClient.post<any>( 'https://reqres.in/api/login', data );
  }
}
