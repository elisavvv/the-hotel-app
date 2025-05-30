import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HotelService } from '../services/hotel.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HotelServiceItem } from '../services/hotel.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-constructor',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './service-constructor.component.html',
  styleUrls: ['./service-constructor.component.css']
})
export class ServiceConstructorComponent {
  availableServices: HotelServiceItem[] = [];
  selectedServices: HotelServiceItem[] = [];
  totalPrice: number = 0;

  constructor(
    private hotelService: HotelService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.hotelService.getHotelServices().subscribe(services => {
      this.availableServices = services;
    });
  }

  drop(event: CdkDragDrop<HotelServiceItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.totalPrice = this.selectedServices.reduce(
      (sum, service) => sum + service.price, 0
    );
  }

  removeService(index: number): void {
    this.availableServices.push(this.selectedServices[index]);
    this.selectedServices.splice(index, 1);
    this.calculateTotal();
  }

  bookServices(): void {
    // Сохраняем выбранные услуги в сервисе
    this.hotelService.setSelectedServices(this.selectedServices);
    
    // Переходим на страницу бронирования
    this.router.navigate(['/booking'], {
      state: { selectedServices: this.selectedServices }
    });
  }
}
