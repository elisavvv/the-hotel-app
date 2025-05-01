import { Component } from '@angular/core';
import { HotelComponent } from './hotel/hotel.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HotelComponent,
  ],
  template: `
  <header class="brand-name">
    <img class="brand-logo" src="assets/logo.svg" alt="Логотип">
    <nav>
      <a routerLink="/" class="nav-button">Главная</a>
      <a routerLink="/services" class="nav-button">Услуги</a>
      <a routerLink="/booking/1" class="nav-button">Бронирование</a>
    </nav>
  </header>
  <main>
    <router-outlet></router-outlet>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HotelApp';
}
