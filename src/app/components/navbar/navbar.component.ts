import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private router: Router,
      private route: ActivatedRoute,
    ) 
    {}

    private isLogged: boolean = false;

    public subscriptions: Subscription[] = [];

    public items: MenuItem[] = [];
      
    ngOnInit() {

        if(this.storageService.getData("logged") == "YES") {
            this.isLogged = true;
        }
        

        this.items = [  
            {
                label: 'Login',
                icon: 'pi pi-fw pi-file',
                routerLink: 'login',
                visible: !this.isLogged
            },
            {
                label: 'Sign-Up',
                icon: 'pi pi-fw pi-file',
                routerLink: 'register',
                visible: !this.isLogged
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-file',
                command: () => this.logout(),
                visible: this.isLogged
            },
        ];
    }


    logout() {

        this.subscriptions.push(
            this.authService.logout().subscribe(
                data => {
                    this.storageService.removeData("logged");
                    this.storageService.removeData("JWT");
                    if(this.router.url != "/home") {

                        this.router.navigate(['/home']);

                    } else {

                        this.router.navigate(['/home'])
                         .then(() => {
                            window.location.reload();
                            });
                    }
                }
            )
        )
        

    }

}