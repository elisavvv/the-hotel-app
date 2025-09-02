import { authGuard } from './auth/auth.guard'; 
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./hotel/hotel.component').then(m => m.HotelComponent),
    children: [
      { path: '', loadComponent: () => import('./hotel-rooms/hotel-rooms.component').then(m => m.HotelRoomsComponent), title: 'Главная' }
    ]
  },
  { 
    path: 'services', 
    loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent),
    title: 'Услуги',
    canActivate: [authGuard] 
  },
  { 
    path: 'booking/:id', 
    loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent),
    title: 'Бронирование',
    canActivate: [authGuard] 
  },
  { 
    path: 'booking', 
    loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'service-constructor', 
    loadComponent: () => import('./service-constructor/service-constructor.component').then(m => m.ServiceConstructorComponent),
    title: 'Конструктор услуг',
    canActivate: [authGuard] 
  },
  { 
    path: 'contacts', 
    loadComponent: () => import('./contacts/contacts.component').then(m => m.ContactsComponent),
    title: 'Контакты' 
  },
  {
  path: 'auth',
  loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
  },
  { 
    path: 'feedback', 
    loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent),
    title: 'Оставить отзыв',
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '' }
];

