import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home/register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register/register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login/register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login/login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register/login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home/login/register', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
