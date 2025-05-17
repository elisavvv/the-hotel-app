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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

interface HotelRoom {
  id: number;
  title: string;
  photo: string;
  type: string;
  price: number;
  features: string[];
  available: boolean;
}

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <div class="rooms-container">
      <div class="room-card" *ngFor="let room of rooms">
        <img [src]="room.photo" alt="Фото номера" class="room-photo">
        <h2 class="room-title">{{ room.title }}</h2>
        <div class="room-details">
          <p>Тип: {{ room.type }}</p>
          <div class="room-features">
            <span class="feature-badge" *ngFor="let feature of room.features">{{ feature }}</span>
          </div>
          <p class="room-price">{{ room.price }} руб./ночь</p>
          <button class="book-button" [disabled]="!room.available">
            {{ room.available ? 'Забронировать' : 'Недоступно' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rooms-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .room-card {
      background: #ffffff;
      border-radius: 12px;
      padding-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .room-photo {
      height: 200px;
      width: 100%;
      object-fit: cover;
      border-radius: 12px 12px 0 0;
    }
    .room-title {
      padding: 12px 16px 0 16px;
      font-size: 1.2rem;
    }
    .room-details {
      padding: 0 16px 12px 16px;
    }
    .room-features {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 8px 0;
    }
    .feature-badge {
      background: #e8f4fc;
      color: #11A6E1;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    .room-price {
      font-weight: bold;
      color: #11A6E1;
      font-size: 1.1rem;
    }
    .book-button {
      background: #11A6E1;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
    }
    .book-button:disabled {
      background: #cccccc;
      cursor: not-allowed;
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
}
