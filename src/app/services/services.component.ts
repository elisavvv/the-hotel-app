import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

interface HotelServiceItem {
  photo: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services$!: Observable<HotelServiceItem[]>; // Объявляем свойство без инициализации

  constructor(private hotelService: HotelService) {} // Сначала получаем сервис

  ngOnInit(): void {
    this.services$ = this.hotelService.getHotelServices(); // Затем инициализируем
    this.services$.subscribe(services => console.log('Services data:', services));
  }
  handleImageError(event: Event, service: HotelServiceItem): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default.jpg'; // Путь к дефолтному изображению
    service.photo = 'assets/images/default.jpg'; // Обновляем свойство в объекте
  }
}

