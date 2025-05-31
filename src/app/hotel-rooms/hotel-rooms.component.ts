import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
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
