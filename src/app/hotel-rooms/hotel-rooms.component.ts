/*import { Component } from '@angular/core';
import { HotelRoom } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rooms-container">
      <app-housing-location.component
        *ngFor="let room of rooms"
        [room]="room">
      </app-housing-location.component>
    </div>
  `,
  styles: [`
    .rooms-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
  `]
})
export class HotelRoomsComponent {
  rooms: HotelRoom[] = [
    {
      id: 1,
      title: 'Люкс с видом на море',
      photo: '/assets/room1.jpg',
      type: 'Двухместный',
      price: 250,
      features: ['Wi-Fi', 'Кондиционер', 'Мини-бар'],
      available: true
    },
    {
      id: 2,
      title: 'Стандартный номер',
      photo: '/assets/room2.jpg',
      type: 'Одноместный',
      price: 150,
      features: ['Wi-Fi', 'Телевизор'],
      available: true
    },
    {
      id: 3,
      title: 'Семейный номер',
      photo: '/assets/room3.jpg',
      type: 'Трехместный',
      price: 320,
      features: ['Wi-Fi', 'Кондиционер', 'Детская кроватка'],
      available: false
    }
  ];
}*/
