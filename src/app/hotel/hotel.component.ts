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