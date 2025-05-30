import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelRoomsComponent } from './hotel-rooms/hotel-rooms.component';
import { ContactsComponent } from './contacts/contacts.component';
import {FeedbackComponent} from './feedback/feedback.component';
import { ServiceConstructorComponent } from './service-constructor/service-constructor.component';
import { authGuard } from './auth/auth.guard'; 

export const routes: Routes = [
  { 
    path: '', 
    component: HotelComponent,
    children: [
      { path: '', component: HotelRoomsComponent, title: 'Главная' }
    ]
  },
  { path: 'services', component: ServicesComponent, title: 'Услуги', canActivate: [authGuard] },
  { path: 'booking/:id', component: BookingComponent, title: 'Бронирование', canActivate: [authGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [authGuard]  },
  { path: 'service-constructor', component: ServiceConstructorComponent, title: 'Конструктор услуг', canActivate: [authGuard]  },
  { path: 'contacts', component: ContactsComponent, title: 'Контакты' },
  { path: 'login', component: LoginComponent, title: 'Вход в систему' },
  { path: 'register', component: RegisterComponent, title: 'Регистрация' },
  { path: 'feedback', component: FeedbackComponent, title: 'Оставить отзыв', canActivate: [authGuard]  },
  { path: '**', redirectTo: '' } // Перенаправление на главную для несуществующих маршрутов
];


