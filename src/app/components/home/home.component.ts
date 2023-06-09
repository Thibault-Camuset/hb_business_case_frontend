import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { CountryService } from 'src/app/services/CountryService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];


    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private countryService: CountryService
    ) 
    {}

  
    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
      // TODO

    }

    testList(): void {

      this.subscriptions.push(

        this.countryService.getAll()
          .subscribe(
            (data : any) => {
               console.log(data);
            }
          )
      );

    }

}