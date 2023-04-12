import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/users';

  getAll() {

    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.storage.getData("JWT"));
  
    return this.http
      .get(
        this.rootURL + '',
        {headers}
      );

  }

  findByEmail() {

    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.storage.getData("JWT"));
      

      let userEmail = this.storage.getData("userEmail")!;

        return this.http
          .get(
            this.rootURL + '/byEmail/'+userEmail,
            {headers}
          );

  }

}