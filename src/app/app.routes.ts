import { Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { BookingComponent } from './booking/booking.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
  { path: '', component: HotelComponent, title: 'Главная' },
  { path: 'services', component: ServicesComponent, title: 'Услуги' },
  { path: 'booking/:id', component: BookingComponent, title: 'Бронирование' },
  { path: 'services', component: ServicesComponent, title: 'Сервисы'},
  { path: '**', redirectTo: '' }
];
