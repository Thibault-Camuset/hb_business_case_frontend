import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { TimeSlot } from '../models/TimeSlot.model';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
    ) {}

  rootURL = 'http://localhost:8080/api/timeSlots';

  getAll() {

    let headers = new HttpHeaders().set("Authorization", 'Bearer ' + this.storage.getData("JWT"));
  
    return this.http
      .get<TimeSlot[]>(
        this.rootURL + '',
        {headers}
      );

  }

}