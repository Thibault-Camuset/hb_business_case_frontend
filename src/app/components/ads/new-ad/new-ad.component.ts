import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { AdService } from 'src/app/services/AdService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormAd } from 'src/app/interfaces/FormAd';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/UserService';
import { ZoneService } from 'src/app/services/ZoneService';
import { TimeSlotService } from 'src/app/services/TimeSlotService';
import { Zone } from 'src/app/models/Zone.model';
import { TimeSlot } from 'src/app/models/TimeSlot.model';
import { AdZoneTimeService } from 'src/app/services/AdZoneTimeService';
import { Ad } from 'src/app/models/Ad.model';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;

    public zones : Zone[] = [];
    public timeSlots : TimeSlot[] = [];


    constructor(
      private storageService: LocalStorageService,
      private userService: UserService,
      private adService: AdService,
      private zoneService: ZoneService,
      private timeSlotService: TimeSlotService,
      private adZoneTimeService: AdZoneTimeService,
      private http: HttpClient,
      private router: Router,
    ) 
    {}


    public adForm = new FormGroup<FormAd>({
        adId: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        adTitle: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        adImage: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        adDescription: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        author: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        selectedZones: new FormControl(
          [],
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        selectedTimeSlots: new FormControl(
          [],
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
    })


  
    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
      this.subscriptions.push(

        this.zoneService.getAll().subscribe(
          (zones: Zone[]) => {
            this.zones = zones;

              this.timeSlotService.getAll().subscribe(
                (timeSlots: TimeSlot[]) => {
                  this.timeSlots = timeSlots;
                }
              )

          }
        )

      )

    }

    public addAd(): void {

      //TODO : verifs?

      let adTitle = this.adForm.controls.adTitle.value;
      let adImage = this.adForm.controls.adImage.value;
      let adDescription = this.adForm.controls.adDescription.value;

      let authorEmail = this.storageService.getData("userEmail")!;

      let adZones : Zone[] = this.adForm.controls.selectedZones.value;
      let adTimeSlots : TimeSlot[] = this.adForm.controls.selectedTimeSlots.value;

        this.subscriptions.push(

            this.userService.findByEmail().subscribe(
                (user : User) => {
                    this.currentUser = user;


                    this.adService.createAd(adTitle, adImage, adDescription, user.userId!)
                        .subscribe(
                            (ad : Ad) => {

                              adZones.forEach(
                                (zone: Zone) => {

                                  adTimeSlots.forEach(
                                    (timeSlot: TimeSlot) => {

                                      if(ad.adId && zone.zoneId && timeSlot.timeSlotId) {
                                          this.adZoneTimeService.createAdZoneTime(ad.adId, zone.zoneId, timeSlot.timeSlotId).subscribe();
                                      }

                                    }
                                  )
                              })
                             this.router.navigate(['/ads']);
                            }
                        )
                }
            )

        )

    }

}