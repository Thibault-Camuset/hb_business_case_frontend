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

@Component({
  selector: 'app-new-zone',
  templateUrl: './new-zone.component.html',
  styleUrls: ['./new-zone.component.css']
})
export class NewZoneComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;
    public isAdmin: boolean = false;

    constructor(
      private storageService: LocalStorageService,
      private userService: UserService,
      private zoneService: ZoneService,
      private http: HttpClient,
      private router: Router,
    ) 
    {}


    public zoneForm = new FormGroup<FormZone>({
        zoneName: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        zoneBasePrice: new FormControl(
          0,
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
        
        this.isAdmin = false;

        this.userService.findByEmail().subscribe(
                (user : User) => {
                    this.currentUser = user;
                    if(this.currentUser.userRole?.roleName?.toString() == "ADMIN") {
                        this.isAdmin = true;
                    }
                }
        )

    }

    public addZone(): void {


        let zoneName = this.zoneForm.controls.zoneName.value;
        let zoneBasePrice = this.zoneForm.controls.zoneBasePrice.value;
 
        let authorEmail = this.storageService.getData("userEmail")!;

        this.subscriptions.push(

            
            this.zoneService.createZone(zoneName, zoneBasePrice)
              .subscribe(
                (zone : Zone) => {
                  this.router.navigate(['/zones']);
                }
              )
  
        )

    }

}