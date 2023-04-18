import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { AdZoneTime } from '../models/AdZoneTime';

@Injectable({
  providedIn: 'root'
})
export class AdZoneTimeService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/adZoneTimes';

  getAllByAdId(adId: string) {

    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.storage.getData("JWT"));
  
    return this.http
      .get<AdZoneTime[]>(
        this.rootURL + '/byAdId/'+adId,
        {headers}
      );

  }

  public createAdZoneTime(adId: string, zoneId : string, timeSlotId: string) {

    let headers = {
        "Authorization" : 'Bearer ' + this.storage.getData("JWT")
    }
 
    return this.http
      .post(
        this.rootURL +"/"+adId+"/"+zoneId+"/"+timeSlotId,
        {}, 
        {headers}   
      );

  }

}