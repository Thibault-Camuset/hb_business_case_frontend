import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdService } from 'src/app/services/AdService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/UserService';
import { ZoneService } from 'src/app/services/ZoneService';
import { TimeSlotService } from 'src/app/services/TimeSlotService';
import { AdZoneTimeService } from 'src/app/services/AdZoneTimeService';
import { Ad } from 'src/app/models/Ad.model';
import { AdZoneTime } from 'src/app/models/AdZoneTime';
import { Zone } from 'src/app/models/Zone.model';
import { TimeSlot } from 'src/app/models/TimeSlot.model';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;

    public currentAd?: Ad = undefined;

    constructor(
      private storageService: LocalStorageService,
      private userService: UserService,
      private adService: AdService,
      private zoneService: ZoneService,
      private timeSlotService: TimeSlotService,
      private adZoneTimeService: AdZoneTimeService,
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
    ) 
    {}


    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
      this.subscriptions.push(

        this.route.params.subscribe(
            params => {
                if(params['adId']) {

                    this.adService.getOneById(params['adId']).subscribe(
                        (ad: Ad) => {
                            this.currentAd = ad;
                            
                            ad.zones = [];
                            ad.timeSlots = [];

                              this.adZoneTimeService.getAllByAdId(ad.adId!).subscribe(
                                (adZoneTimes: Array<AdZoneTime>) => {

                                  adZoneTimes.forEach(
                                    (adZoneTime : AdZoneTime) => {

                                      let zonesResult = ad.zones!.find((zone : Zone) => {
                                        return zone.zoneId === adZoneTime.zone?.zoneId;
                                      })
                                      if(zonesResult == undefined) {
                                        ad.zones?.push(adZoneTime.zone!);
                                      }
                                      let timeSlotsResult = ad.timeSlots!.find((timeSlot : TimeSlot) => {
                                        return timeSlot.timeSlotId === adZoneTime.time?.timeSlotId;
                                      })
                                      if(timeSlotsResult == undefined) {
                                        ad.timeSlots?.push(adZoneTime.time!);
                                      }
                                    }
                                  )
                                }
                              )


                        }
                    )

                }
            }
        )

      )

    }


    public getZonesDisplay() {
      return this.currentAd!.zones && this.currentAd!.zones.length > 0
        ? this.currentAd!.zones.map(zone => zone.zoneName).join(", ")
        : "No zones have been found"
      ;
    }

    public getTimeSlotsDisplay() {
      return this.currentAd!.timeSlots && this.currentAd!.timeSlots.length > 0
        ? this.currentAd!.timeSlots.map(timeSlot => timeSlot.timeSlotName).join(", ")
        : "No time slots have been found"
      ;
    }


}