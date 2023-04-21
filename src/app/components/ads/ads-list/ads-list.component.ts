import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { AdService } from 'src/app/services/AdService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/Ad.model';
import { User } from 'src/app/models/User.model';
import { AdZoneTimeService } from 'src/app/services/AdZoneTimeService';
import { AdZoneTime } from 'src/app/models/AdZoneTime';
import { ZoneService } from 'src/app/services/ZoneService';
import { TimeSlotService } from 'src/app/services/TimeSlotService';
import { Zone } from 'src/app/models/Zone.model';
import { TimeSlot } from 'src/app/models/TimeSlot.model';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Role } from 'src/app/models/Role.model';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdsListComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;

    public ads: Ad[] = [];

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private userService: UserService,
      private adService: AdService,
      private adZoneTimeService: AdZoneTimeService,
      private zoneService : ZoneService,
      private timeSlotService : TimeSlotService,
      private router: Router,
      private confirmationService: ConfirmationService, 
      private messageService: MessageService
    ) 
    {}

  
    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
      this.refreshData();
    
    }

    public refreshData(): void {

      this.subscriptions.push(

            this.userService.findByEmail().subscribe(
                (user : User) => {
                    this.currentUser = user;
                    console.log(this.currentUser);
                    // TODO: trouver comme ne pas sérialiser le mot de passe.
                    this.adService.getAllByUser()
                      .subscribe(
                        (data : Array<Ad>) => {
                          this.ads = data;
                          
                          this.ads.forEach(
                            (ad: Ad) => {

                              ad.zones = [];
                              ad.timeSlots = [];
                              ad.totalPrice = 0;

                              this.adZoneTimeService.getAllByAdId(ad.adId!).subscribe(
                                (adZoneTimes: Array<AdZoneTime>) => {

                                  adZoneTimes.forEach(
                                    (adZoneTime : AdZoneTime) => {

                                      ad.totalPrice! += adZoneTime.price!;

                                      let zonesResult = ad.zones!.find((zone : Zone) => {
                                        return zone.zoneId === adZoneTime.zone?.zoneId;
                                      });
                                      if(zonesResult == undefined) {
                                        ad.zones?.push(adZoneTime.zone!);
                                      }
                                      let timeSlotsResult = ad.timeSlots!.find((timeSlot : TimeSlot) => {
                                        return timeSlot.timeSlotId === adZoneTime.time?.timeSlotId;
                                      });
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
                      )
                })
      );

    }


    public getZonesDisplay(ad: Ad) {
      return ad.zones && ad.zones.length > 0
        ? ad.zones.map(zone => zone.zoneName).join(", ")
        : "No zones have been found"
      ;
    }

    public getTimeSlotsDisplay(ad: Ad) {
      return ad.timeSlots && ad.timeSlots.length > 0
        ? ad.timeSlots.map(timeSlot => timeSlot.timeSlotName).join(", ")
        : "No time slots have been found"
      ;
    }

    public goToDetails(ad: Ad): void {

      this.router.navigate(['/ads/details/', ad.adId]);

    }

    public deleteAd(ad: Ad): void {

      this.confirmationService.confirm({
            message: 'Do you want to delete this ad?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.subscriptions.push(
                  this.adService.deleteAd(ad.adId!).subscribe(
                    result => {
                      this.refreshData();
                    }
                  )
                )
                this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Ad cancelled' });
            },
        });

    }

    public validateAd(ad: Ad): void {

      this.confirmationService.confirm({
            message: 'Do you want to validate this ad?',
            header: 'Validation Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.subscriptions.push(
                  this.adService.validateAd(ad.adId!).subscribe(
                    result => {
                      this.refreshData();
                    }
                  )
                )
                this.messageService.add({ severity: 'info', summary: 'Validated', detail: 'Ad validated' });
            },
        });

    }

    public redirectToCreate(): void {

        this.router.navigate(['/ads/new']);

    }

}