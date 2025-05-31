import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/*export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Вход в систему' },
  { path: 'register', component: RegisterComponent, title: 'Регистрация' },
];*/

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    title: 'Вход в систему'
  },
  { 
    path: 'register', 
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    title: 'Регистрация'
  }
];