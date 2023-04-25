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
import { FormZone } from 'src/app/interfaces/FormZone';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ZonesListComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;

    public zones : Zone[] = [];

    constructor(
        private storageService: LocalStorageService,
        private userService: UserService,
        private zoneService: ZoneService,
        private http: HttpClient,
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

                    this.zoneService.getAll()
                      .subscribe(
                        (zones : Array<Zone>) => {
                          this.zones = zones;
                        }
                      )
                })
      );

    }

   public deleteZone(zone: Zone): void {

      this.confirmationService.confirm({
            message: 'Do you want to delete this zone?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.subscriptions.push(
                  this.zoneService.deleteZone(zone.zoneId!).subscribe(
                    result => {
                      this.refreshData();
                    }
                  )
                )
                this.messageService.add({ severity: 'info', summary: 'Deleted', detail: 'Zone deleted' });
            },
        });

    }

    public redirectToCreate(): void {

        this.router.navigate(['/zones/new']);

    }

}