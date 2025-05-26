/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HotelService } from '../services/hotel.service';
import { HotelServiceItem } from '../services/hotel.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-constructor',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="constructor-container" cdkDropListGroup>
      <h2>Соберите свой пакет услуг</h2>
      
      <div class="services-grid">
        <!-- Доступные услуги -->
        <div class="services-section">
          <h3>Доступные услуги</h3>
          <div 
            cdkDropList
            #availableList="cdkDropList"
            [cdkDropListData]="availableServices"
            [cdkDropListConnectedTo]="[selectedList]"
            class="services-list"
            (cdkDropListDropped)="drop($event)"
          >
            <div 
              *ngFor="let service of availableServices" 
              cdkDrag
              class="service-card"
            >
              <img [src]="service.photo" [alt]="service.name" class="service-image">
              <div class="service-info">
                <h4>{{ service.name }}</h4>
                <p>{{ service.description }}</p>
                <div class="service-meta">
                  <span>{{ service.price }} руб.</span>
                  <span>{{ service.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Выбранные услуги -->
        <div class="services-section">
          <h3>Ваш пакет</h3>
          <div 
            cdkDropList
            #selectedList="cdkDropList"
            [cdkDropListData]="selectedServices"
            [cdkDropListConnectedTo]="[availableList]"
            class="services-list selected"
            (cdkDropListDropped)="drop($event)"
          >
            <div 
              *ngFor="let service of selectedServices; let i = index" 
              cdkDrag
              class="service-card"
            >
              <button mat-icon-button class="remove-btn" (click)="removeService(i)">
                <mat-icon>close</mat-icon>
              </button>
              <img [src]="service.photo" [alt]="service.name" class="service-image">
              <div class="service-info">
                <h4>{{ service.name }}</h4>
                <div class="service-meta">
                  <span>{{ service.price }} руб.</span>
                </div>
              </div>
            </div>

            <div *ngIf="selectedServices.length === 0" class="empty-placeholder">
              Перетащите сюда услуги
            </div>
          </div>

          <div class="total-section">
            <h4>Итого: {{ totalPrice }} руб.</h4>
            <button 
              mat-raised-button 
              color="primary" 
              (click)="confirmSelection()"
              [disabled]="selectedServices.length === 0"
            >
              Подтвердить выбор
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .constructor-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 20px;
    }
  `]
})
export class ServiceConstructorComponent {
  availableServices: HotelServiceItem[] = [];
  selectedServices: HotelServiceItem[] = [];
  totalPrice: number = 0;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getHotelServices().subscribe(services => {
      this.availableServices = services;
    });
  }

  drop(event: CdkDragDrop<HotelServiceItem[]>) {
    console.log('Drop event:', event); // Для отладки
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

  calculateTotal() {
    this.totalPrice = this.selectedServices.reduce(
      (sum, service) => sum + service.price, 0
    );
  }

  removeService(index: number) {
    this.availableServices.push(this.selectedServices[index]);
    this.selectedServices.splice(index, 1);
    this.calculateTotal();
  }

  confirmSelection() {
    alert(`Вы выбрали ${this.selectedServices.length} услуг на сумму ${this.totalPrice} руб.`);
  }
}*/

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
    private router: Router // Инжектируем Router
  ) {}

  ngOnInit() {
    this.hotelService.getHotelServices().subscribe(services => {
      this.availableServices = services;
    });
  }

  drop(event: CdkDragDrop<HotelServiceItem[]>) {
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

  calculateTotal() {
    this.totalPrice = this.selectedServices.reduce(
      (sum, service) => sum + service.price, 0
    );
  }

  removeService(index: number) {
    this.availableServices.push(this.selectedServices[index]);
    this.selectedServices.splice(index, 1);
    this.calculateTotal();
  }

  bookServices() {
    // Сохраняем выбранные услуги в сервисе
    this.hotelService.setSelectedServices(this.selectedServices);
    
    // Переходим на страницу бронирования
    this.router.navigate(['/booking'], {
      state: { selectedServices: this.selectedServices }
    });
  }
}
