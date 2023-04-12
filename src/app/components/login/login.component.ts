import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormLogin } from 'src/app/interfaces/FormLogin';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private router: Router,
    ) 
    {}


    public loginForm = new FormGroup<FormLogin>({
        userEmail: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
        userPassword: new FormControl(
          "",
          {
            nonNullable: true,
            validators: [Validators.required]
          }
        ),
    })



    ngOnInit(): void {
        
      // TODO

    }

    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

    }



    public doLogin(): void {

      //TODO : verif si loggé, si bon user...

      
      let userEmail = this.loginForm.controls.userEmail.value;
      let userPassword = this.loginForm.controls.userPassword.value;

      this.subscriptions.push(

        this.authService.login(userEmail, userPassword)
          .subscribe(
            (data : any) => {
              this.storageService.saveData("JWT", data.token);
              this.storageService.saveData("logged", "YES")
              console.log(this.storageService.getData("JWT"));
              this.storageService.saveData("userEmail", userEmail);
              this.router.navigate(['/home']);
            }
            //TODO : gestion si erreur login
          )

      );

    }

    public redirectToRegister(): void {

      this.router.navigate(['/register']);

    }


}