import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelService, HousingLocation } from '../services/hotel.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers: [AuthService]
})
export class HotelComponent implements OnInit {
  username: string = 'Гость';
  searchText = '';
  housingLocations: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];
  isLoading = true;
  private destroyRef = inject(DestroyRef); // Добавляем DestroyRef

  constructor(
    private hotelService: HotelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  logout(): void {
    this.authService.logout();
  }

  loadData(): void {
    this.hotelService.getHousingLocations().pipe(
      tap(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef) // Добавляем автоматическую отписку
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

  filterLocations(): void {
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