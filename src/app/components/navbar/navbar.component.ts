import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class NavBarComponent implements OnInit, OnDestroy {

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private router: Router,
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
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: '/home'
            },
            {
                label: 'Ads',
                icon: 'pi pi-fw pi-table',
                routerLink: '/ads',
                visible: this.isLogged
            },
            {
                label: 'Login',
                style: {'margin-left': 'auto', 'float': 'right'},
                icon: 'pi pi-fw pi-sign-in',
                routerLink: '/login',
                visible: !this.isLogged
            },
            {
                label: 'Logout',
                style: {'margin-left': 'auto', 'float': 'right'},
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.logout(),
                visible: this.isLogged
            },
        ];
    }

    ngOnDestroy(): void {

      this.subscriptions.filter(sub => !sub.closed).forEach(sub => sub.unsubscribe);

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