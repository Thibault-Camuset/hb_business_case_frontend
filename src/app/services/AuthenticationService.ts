import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) 
    {}

  // TODO: exporter en constante
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


  logout() {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    return this.http
          .post(
            this.rootURL + '/logout',
            {},
            {headers}
          );

    }

}