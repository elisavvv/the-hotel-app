import { Component, OnInit } from '@angular/core';
import { HotelService, HotelServiceItem  } from '../services/hotel.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface HousingLocation {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  features: string[];
  duration: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services$!: Observable<HotelServiceItem[]>; // Объявляем свойство без инициализации
  selectedServices: HotelServiceItem[] = [];

  constructor(private hotelService: HotelService) {} // Сначала получаем сервис

  ngOnInit(): void {
    this.services$ = this.hotelService.getHotelServices(); // Затем инициализируем
    //this.services$.subscribe(services => console.log('Services data:', services));
    this.selectedServices = this.hotelService.getSelectedServices();
  }
  handleImageError(event: Event, service: HotelServiceItem): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default.jpg'; // Путь к дефолтному изображению
    service.photo = 'assets/images/default.jpg'; // Обновляем свойство в объекте
  }
  drop(event: CdkDragDrop<HotelServiceItem[]>) {
    if (!event.container.data || !event.previousContainer.data){ return;}

    if (event.previousContainer === event.container) {
      // Перемещение внутри одного списка
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Перемещение между списками
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Сохраняем выбранные услуги
      this.hotelService.setSelectedServices(this.selectedServices);
    }
  }
}

