import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormRegister } from 'src/app/interfaces/FormRegister';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private http: HttpClient,
       private router: Router,
    ) 
    {}


    public registerForm = new FormGroup<FormRegister>({
        userLastName: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        userFirstName: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        userEmail: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [
              Validators.required, 
              Validators.email]
          }
        ),
        userPassword: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-])/
              ),]
          }
        ),
    })



    ngOnInit(): void {
        
      // TODO

    }

    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }



    public doRegister(): void {

      //TODO : verifs?

      let userLastName = this.registerForm.controls.userLastName.value;
      let userFirstName = this.registerForm.controls.userFirstName.value;
      let userEmail = this.registerForm.controls.userEmail.value;
      let userPassword = this.registerForm.controls.userPassword.value;

      this.subscriptions.push(

        this.authService.register(userLastName, userFirstName, userEmail, userPassword)
          .subscribe(
            (data : any) => {
              this.storageService.saveData("JWT", data.token);
              this.storageService.saveData("logged", "YES");
              this.storageService.saveData("userEmail", userEmail);
              this.router.navigate(['/home']);
            }
            //TODO : gestion si erreur register
          )

      );

    }


}