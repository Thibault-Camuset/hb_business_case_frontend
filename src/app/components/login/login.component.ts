import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

    public subscriptions: Subscription[] = [];

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private http: HttpClient,
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
              this.router.navigate(['/home']);
            }
            //TODO : gestion si erreur login
          )

      );

    }

    redirectToRegister(): void {

      this.router.navigate(['/register']);

    }


}