import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8080/api/auth';

  login(userEmail: string, userPassword: string) {

    let params = {
      'userEmail' : userEmail,
      'userPassword' : userPassword
    };

    return this.http
      .post(
        this.rootURL + '/login',
        {}, 
        {params}
      );

  }

  register(userLastName: string, userFirstName : string, userEmail: string, userPassword: string) {

    let params = {
      'userLastName' : userLastName,
      'userFirstName' : userFirstName,
      'userEmail' : userEmail,
      'userPassword' : userPassword
    };

    return this.http
      .post(
        this.rootURL + '/register',
        {}, 
        {params}
      );

  }

}