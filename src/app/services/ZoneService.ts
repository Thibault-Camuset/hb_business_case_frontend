import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { Zone } from '../models/Zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/zones';

  getAll() {

    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.storage.getData("JWT"));
  
    return this.http
      .get<Zone[]>(
        this.rootURL + '',
        {headers}
      );

  }

}