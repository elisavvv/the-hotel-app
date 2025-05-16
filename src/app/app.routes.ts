import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'services', component: ServicesComponent, title: 'Услуги' },
  { path: 'booking/:id', component: BookingComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  { path: 'register', component: RegisterComponent },
];
