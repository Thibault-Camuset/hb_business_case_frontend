import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AuthenticationService } from 'src/app/services/AuthenticationService';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

    constructor(
      private authService: AuthenticationService,
      private storageService: LocalStorageService,
      private userService: UserService,
      private router: Router,
    ) 
    {}

    private isLogged: boolean = false;
    private isAdmin: boolean = false;

    public subscriptions: Subscription[] = [];

    public currentUser?: User = undefined;

    public items: MenuItem[] = [];
      
    ngOnInit() {

        if(this.storageService.getData("logged") == "YES") {
            this.isLogged = true;
        }
        if(this.isLogged) {
            this.userService.findByEmail().subscribe(
                (user : User) => {
                    this.currentUser = user;
                    console.log(this.currentUser.userRole?.roleName?.toString());
                    if(this.currentUser.userRole?.roleName?.toString() == 'ADMIN') {
                        this.isAdmin = true;
                    }
                    console.log(this.currentUser);
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
                label: 'Zones',
                icon: 'pi pi-fw pi-table',
                routerLink: '/zones',
                visible: this.isLogged && this.currentUser != undefined && this.isAdmin
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
        )
        } else {
            this.items = [  
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: '/home'
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