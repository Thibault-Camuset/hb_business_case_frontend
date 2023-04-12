import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { Add } from '../models/Add.model';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/adds';

  public getAll(): Observable< Add[] > {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    return this.http
      .get< Add[] >(
        this.rootURL + '',
        {headers}
      );

  }


  public createAdd(addTitle: string, addImage : string, addDescription: string, author: string) {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    return this.http
      .post(
        this.rootURL +"/"+addTitle+"/"+addImage+"/"+addDescription+"/"+author,
        {}, 
        {headers}
      );

  }


}