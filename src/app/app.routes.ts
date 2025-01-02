import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './welcome-page/login/login.component';
import { RegisterComponent } from './welcome-page/register/register.component';
import { ForgotComponent } from './welcome-page/forgot/forgot.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotComponent },
    ]
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' } 
];
