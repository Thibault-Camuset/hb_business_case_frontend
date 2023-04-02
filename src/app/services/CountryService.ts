import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/countries';

  getAll() {

    let headers = {
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin' : '*',
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    console.log(headers);
  
    return this.http
      .get(
        this.rootURL + '',
        {headers}
      );

  }
}