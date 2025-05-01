import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

// Тип для данных о номерах (можно вынести в отдельный файл)
export interface HousingLocation {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  features: string[];
}

@Injectable({ providedIn: 'root' }) // Автоматически регистрируем сервис
export class HotelService {
  constructor(private http: HttpClient) {}
  private bookings: any[] = []; // Mock-база бронирований

  // Метод для загрузки данных (с имитацией API через `delay`)
  getHousingLocations(): Observable<HousingLocation[]> {

    // Имитируем API с задержкой 1 сек:
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

    return of(mockData).pipe(delay(1000)); // Задержка для имитации сети
  }

  // Метод для фильтрации 
  filterLocations(searchText: string, locations: HousingLocation[]): HousingLocation[] {
    if (!searchText) return locations;
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  //Получаем номер по ID
  getRoomById(id: number) {
    const mockRooms = [
      { id: 1, name: 'Одноместный номер', price: 5000 },
      { id: 2, name: 'Двухместный номер', price: 8000 },
      { id: 3, name: 'Трехместный номер', price: 10000 },
      { id: 4, name: 'Люкс', price: 15000 },
      { id: 5, name: 'Президентский люкс', price: 25000 },
      
    ];
    return of(mockRooms.find(room => room.id === +id)).pipe(delay(500));
  }

  // Отправка бронирования
  bookRoom(bookingData: any) {
    this.bookings.push(bookingData); // Сохраняем в mock-массив
    return of({ success: true }).pipe(delay(1000)); // Имитация API
  }
  getHotelServices() {
    const services = [
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
      }
    ];
    return of(services).pipe(delay(300)); // Имитация загрузки
  }
}

