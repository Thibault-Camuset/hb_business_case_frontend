import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { NewAdComponent } from './components/ads/new-ad/new-ad.component';
import { AdDetailsComponent } from './components/ads/ad-details/ad-details.component';
import { ZonesListComponent } from './components/zones/zones-list/zones-list.component';
import { NewZoneComponent } from './components/zones/new-zone/new-zone.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'ads', component: AdsListComponent },
  { path: 'ads/new', component: NewAdComponent },
  { path: 'ads/details/:adId', component: AdDetailsComponent },

  { path: 'zones', component: ZonesListComponent },
  { path: 'zones/new', component: NewZoneComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
