import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';
import { Ad } from '../models/Ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/ads';

  public getAll(): Observable< Ad[] > {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    return this.http
      .get< Ad[] >(
        this.rootURL + '',
        {headers}
      );

  }

   public getAllByUser(): Observable< Ad[] > {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

        let userEmail = this.storage.getData("userEmail")!;

    return this.http
      .get< Ad[] >(
        this.rootURL + '/byUser/'+userEmail,
        {headers}
      );

  }


  public createAd(adTitle: string, adImage : string, adDescription: string, author: string) {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }

    return this.http
      .post(
        this.rootURL +"/"+adTitle+"/"+adImage+"/"+adDescription+"/"+author,
        {}, 
        {headers}   
      );

  }


}