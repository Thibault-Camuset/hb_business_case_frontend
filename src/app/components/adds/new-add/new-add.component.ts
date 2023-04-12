import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { AddService } from 'src/app/services/AddService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormAdd } from 'src/app/interfaces/FormAdd';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.css']
})
export class NewAddComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;


    constructor(
      private storageService: LocalStorageService,
      private userService: UserService,
      private addService: AddService,
      private http: HttpClient,
      private router: Router,
    ) 
    {}


    public addForm = new FormGroup<FormAdd>({
        addId: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        addTitle: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        addImage: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        addDescription: new FormControl(
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
    })


  
    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }

    ngOnInit(): void {
        
      // TODO

    }

    public addAdd(): void {

      //TODO : verifs?

      let addTitle = this.addForm.controls.addTitle.value;
      let addImage = this.addForm.controls.addImage.value;
      let addDescription = this.addForm.controls.addDescription.value;

      let authorEmail = this.storageService.getData("userEmail")!;

        this.subscriptions.push(

            this.userService.findByEmail().subscribe(
                (user : User) => {
                    this.currentUser = user;


                    this.addService.createAdd(addTitle, addImage, addDescription, user.userId!)
                        .subscribe(
                            (data : any) => {

                            this.router.navigate(['/adds']);
                            }
                        )
                }
            )

        )

    }

}