import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';


import { NewAdComponent } from './components/ads/new-ad/new-ad.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { AdDetailsComponent } from './components/ads/ad-details/ad-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewAdComponent,
    AdsListComponent,
    AdDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    DividerModule,
    PasswordModule,
    ButtonModule, 
    InputTextModule,
    TableModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    ChipModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
