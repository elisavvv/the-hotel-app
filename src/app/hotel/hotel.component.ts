/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    FormsModule,
    RouterModule
  ],
  template: `
    <section class="results">
      <app-housing-location 
        *ngFor="let location of filteredLocations"
        [housingLocation]="location">
      </app-housing-location>
    </section>
    <div class="search-container">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Фильтровать по гостиничным номерам"
          class="search-input"
          [(ngModel)]="searchText"
          (input)="filterLocations()"
        >
        <button class="search-button" (click)="filterLocations()">
          Поиск
        </button>
      </div>
      <div class="hotel-photo-container">
        <img 
          src="assets/images/hotel1.jpg" 
          alt="Фото отеля"
          class="hotel-photo"
        >
        <div class="hotel-info">
          <h2>Про отель</h2>
          <p><b>Grand Cosmopolitan — один из лучших отелей в Дубай.</b></p>
          <ul>
            <li>Гостиница Grand Cosmopolitan Hotel расположена в городе Дубай.</li>
            <li>Количество звёзд: 5.</li>
            <li>Есть кондиционер, холодильник, телевизор, фен, утюг, чай/кофе в номерах, сейф, терраса, мини-бар.</li>
            <li>В гостинице есть ресторан, бар, тренажёрный зал, сауна, конференц-зал.</li>
            <li>Открытый бассейн для гостей.</li>
            <li>Доступ в интернет для всех гостей.</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 20px;
      background: white;
    }
    
    .search-box {
      display: flex;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .search-input {
      flex: 1;
      padding: 12px 15px;
      border: 2px solid #11A6E1;
      border-radius: 8px 0 0 8px;
      font-size: 16px;
      outline: none;
    }
    
    .search-button {
      padding: 0 25px;
      background-color: #11A6E1;
      color: white;
      border: none;
      border-radius: 0 8px 8px 0;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .search-button:hover {
      background-color: #0E8BC2;
    }
    
    .hotel-photo-container {
      margin-top: 20px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .hotel-photo {
      width: 50%;
      max-height: 1000px;
      object-fit: cover;
      display: block;
    }
    
    .hotel-info {
      padding: 16px;
      background: white;
    }
    
    .hotel-info h2 {
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .hotel-info p {
      margin: 0;
      color: #11A6E1;
    }
    
    .results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
  `]
})
export class HotelComponent {
  searchText = '';
  housingLocations = [
    {
      id: 1,
      name: 'Одноместный номер',
      description: 'Уютный одноместный номер с видом на город',
      photo: 'assets/images/room1.jpg',
      price: 5000,
      features: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Мини-бар']
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
  filteredLocations = this.housingLocations;

  filterLocations() {
    if (!this.searchText) {
      this.filteredLocations = this.housingLocations;
      return;
    }

    this.filteredLocations = this.housingLocations.filter(location =>
      location.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.features.some(feature => 
        feature.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelService, HousingLocation } from '../services/hotel.service'; // Путь к сервису
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    FormsModule,
    RouterModule
  ],
  template: `
    <!-- Индикатор загрузки (новое) -->
    <div *ngIf="isLoading" class="loading">Загрузка данных...</div>

    <!-- Ваш существующий контент (без изменений) -->
    <section class="results">
      <app-housing-location 
        *ngFor="let location of filteredLocations"
        [housingLocation]="location">
      </app-housing-location>
    </section>
    <div class="search-container">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Фильтровать по гостиничным номерам"
          class="search-input"
          [(ngModel)]="searchText"
          (input)="filterLocations()"
        >
        <button class="search-button" (click)="filterLocations()">
          Поиск
        </button>
      </div>
      <div class="hotel-photo-container">
        <img 
          src="assets/images/hotel1.jpg" 
          alt="Фото отеля"
          class="hotel-photo"
        >
        <div class="hotel-info">
          <h2>Про отель</h2>
          <p><b>Grand Cosmopolitan — один из лучших отелей в Дубай.</b></p>
          <ul>
            <li>Гостиница Grand Cosmopolitan Hotel расположена в городе Дубай.</li>
            <li>Количество звёзд: 5.</li>
            <li>Есть кондиционер, холодильник, телевизор, фен, утюг, чай/кофе в номерах, сейф, терраса, мини-бар.</li>
            <li>В гостинице есть ресторан, бар, тренажёрный зал, сауна, конференц-зал.</li>
            <li>Открытый бассейн для гостей.</li>
            <li>Доступ в интернет для всех гостей.</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
    padding: 20px;
    background: white;
  }
  
  .search-box {
    display: flex;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input {
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #11A6E1;
    border-radius: 8px 0 0 8px;
    font-size: 16px;
    outline: none;
  }
  
  .search-button {
    padding: 0 25px;
    background-color: #11A6E1;
    color: white;
    border: none;
    border-radius: 0 8px 8px 0;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .search-button:hover {
    background-color: #0E8BC2;
  }
  
  .hotel-photo-container {
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .hotel-photo {
    width: 50%;
    max-height: 1000px;
    object-fit: cover;
    display: block;
  }
  
  .hotel-info {
    padding: 16px;
    background: white;
  }
  
  .hotel-info h2 {
    margin: 0 0 8px 0;
    color: #333;
  }
  
  .hotel-info p {
    margin: 0;
    color: #11A6E1;
  }
  
  .results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;

     Добавляем только новый стиль для индикатора загрузки 
    .loading {
      padding: 20px;
      text-align: center;
      font-weight: bold;
      color: #11A6E1;
    }
  `]
})
export class HotelComponent implements OnInit {
  searchText = '';
  housingLocations: HousingLocation[] = []; // Теперь данные приходят из сервиса
  filteredLocations: HousingLocation[] = [];
  isLoading = true; // Новое свойство для загрузки

  constructor(private hotelService: HotelService) {} // Инжектируем сервис

  ngOnInit() {
    this.loadData(); // Загружаем данные при инициализации
  }

  // Новый метод для загрузки данных
  loadData() {
    this.hotelService.getHousingLocations().pipe(
      tap(() => this.isLoading = false) // Скрываем индикатор после загрузки
    ).subscribe({
      next: (data) => {
        this.housingLocations = data;
        this.filteredLocations = data; // Инициализируем отображаемые данные
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
        this.isLoading = false;
      }
    });
  }

  // Существующий метод фильтрации (немного модифицирован)
  filterLocations() {
    if (!this.searchText) {
      this.filteredLocations = this.housingLocations;
      return;
    }

    this.filteredLocations = this.housingLocations.filter(location =>
      location.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.features.some(feature => 
        feature.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelService, HousingLocation } from '../services/hotel.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './hotel.component.html', // Используем внешний HTML-файл
  styleUrls: ['./hotel.component.css']   // Переносим стили в отдельный файл
})
export class HotelComponent implements OnInit {
  searchText = '';
  housingLocations: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];
  isLoading = true;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.hotelService.getHousingLocations().pipe(
      tap(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this.housingLocations = data;
        this.filteredLocations = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
        this.isLoading = false;
      }
    });
  }

  filterLocations() {
    if (!this.searchText) {
      this.filteredLocations = this.housingLocations;
      return;
    }
    this.filteredLocations = this.housingLocations.filter(location =>
      location.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      location.features.some(feature => 
        feature.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}