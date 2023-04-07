import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

    public subscriptions: Subscription[] = [];


    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private countryService: CountryService
    ) 
    {}


    ngOnInit(): void {
        
      // TODO

    }

    public testRegister(): void {

      console.log("TestRegister en cours...");
      
      let userLastName : string = "LeGrand";
      let userFirstName : string = "Tata";
      let userEmail : string = "tata@gmail.com";
      let userPassword : string = "Coucou";

      this.subscriptions.push(

        this.authService.register(userLastName, userFirstName, userEmail, userPassword)
          .subscribe(
            (data : any) => {
              this.storageService.saveData("JWT", data.token)
              console.log(this.storageService.getData("JWT"));
            }
          )

      );

    }



    public testLogin(): void {

      console.log("TestLogin en cours...")
      
      let userEmail : string = "tata@gmail.com";
      let userPassword : string = "Coucou";

      this.subscriptions.push(

        this.authService.login(userEmail, userPassword)
          .subscribe(
            (data : any) => {
              this.storageService.saveData("JWT", data.token)
              console.log(this.storageService.getData("JWT"));
            }
          )

      );

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

    public ngOnDestroy(): void {

    }
    

}