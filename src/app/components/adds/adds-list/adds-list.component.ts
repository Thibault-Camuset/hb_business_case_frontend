import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { AddService } from 'src/app/services/AddService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { Add } from 'src/app/models/Add.model';

@Component({
  selector: 'app-adds-list',
  templateUrl: './adds-list.component.html',
  styleUrls: ['./adds-list.component.css']
})
export class AddsListComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public adds: Add[] = [];

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private addService: AddService,
      private router: Router
    ) 
    {}

  
    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
     this.subscriptions.push(

        this.addService.getAll()
          .subscribe(
            (data : Add[]) => {
               this.adds = data;
               console.log(data);
            }
          )
      );

    }

    public redirectToCreate(): void {

        this.router.navigate(['/adds/new']);

    }

}