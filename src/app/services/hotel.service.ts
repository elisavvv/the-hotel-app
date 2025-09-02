import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

export interface HousingLocation {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  features: string[];
}
export interface Room {
  id: number;
  name: string;
  price: number;
}

export interface HotelServiceItem {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  duration: string;
}

export interface BookingResponse {
  success: boolean;
}

@Injectable({ providedIn: 'root' }) 
export class HotelService {
  private bookings: any[] = []; 
  private selectedServices: HotelServiceItem[] = [];

  constructor(private http: HttpClient) {}

  getHousingLocations(): Observable<HousingLocation[]> {

    const mockData: HousingLocation[] = [
      {
        id: 1,
        name: 'Одноместный номер',
        description: 'Уютный номер с видом на город',
        photo: 'assets/images/room1.jpg',
        price: 5000,
        features: ['Wi-Fi', 'Кондиционер', 'Телевизор'],
      },
      {
      id: 2,
      name: 'Двухместный номер',
      description: 'Просторный двухместный номер с двуспальной кроватью',
      photo: 'assets/images/room2.jpg',
      price: 8000,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Сейф']
      },
      {
      id: 3,
      name: 'Трехместный номер',
      description: 'Большой трехместный номер для семьи или компании',
      photo: 'assets/images/room3.jpg',
      price: 10000,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Сейф', 'Халаты']
      },
      {
      id: 4,
      name: 'Люкс',
      description: 'Роскошный номер с гостиной зоной и видом на море',
      photo: 'assets/images/room4.jpg',
      price: 15000,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Сейф', 'Халаты', 'Джакузи']
      },
      {
      id: 5,
      name: 'Президентский люкс',
      description: 'Эксклюзивный номер высочайшего класса',
      photo: 'assets/images/room5.jpg',
      price: 25000,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Сейф', 'Халаты', 'Джакузи', 'Отдельная терраса']
      }
      ];

    return of(mockData).pipe(delay(1000)); 
  }

  filterLocations(searchText: string, locations: HousingLocation[]): HousingLocation[] {
    if (!searchText) return locations;

    return locations.filter(loc => 
      loc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getRoomById(id: number): Observable<Room | undefined> {
    const mockRooms: Room[] = [
      { id: 1, name: 'Одноместный номер', price: 5000 },
      { id: 2, name: 'Двухместный номер', price: 8000 },
      { id: 3, name: 'Трехместный номер', price: 10000 },
      { id: 4, name: 'Люкс', price: 15000 },
      { id: 5, name: 'Президентский люкс', price: 25000 },
      
    ];

    return of(mockRooms.find(room => room.id === +id)).pipe(delay(500));
  }


  bookRoom(bookingData: any): Observable<BookingResponse> {
    this.bookings.push(bookingData); 

    return of({ success: true }).pipe(delay(1000)); 
  }
  getHotelServices(): Observable<HotelServiceItem[]> {
    const services: HotelServiceItem[] = [
      { 
        id: 1, 
        name: 'SPA-комплекс', 
        description: 'Полный релакс с бассейном, сауной и массажем',
        photo: 'assets/images/spa.jpg',
        price: 3000,
        duration: '2 часа'
      },
      { 
        id: 2, 
        name: 'Трансфер', 
        description: 'Трансфер из аэропорта на комфортабельном авто',
        photo: 'assets/images/transfer.jpg',
        price: 1500,
        duration: 'В одну сторону'
      },
      {
        id: 3,
        name: 'Экскурсии по Дубаю',
        description: 'Авторские экскурсии с профессиональным гидом',
        photo: 'assets/images/exursion.jpg',
        price: 4500,
        duration: '4 часа'
      },
      {
        id: 4,
        name: 'Персональный консьерж',
        description: 'Организация ресторанов, билетов и мероприятий',
        photo: 'assets/images/concierge.jpg',
        price: 7000,
        duration: '1 день'
      },
      {
        id: 5,
        name: 'Детский клуб',
        description: 'Профессиональный присмотр за детьми с развлекательной программой',
        photo: 'assets/images/kids-club.jpg',
        price: 2500,
        duration: '3 часа'
      }
    ];

    return of(services).pipe(delay(300)); 
  }
  setSelectedServices(services: HotelServiceItem[]): void {
    this.selectedServices = services;
  }
  getSelectedServices(): HotelServiceItem[] {
    return this.selectedServices;
  }
  clearSelectedServices(): void {
    this.selectedServices = [];
  }
}

