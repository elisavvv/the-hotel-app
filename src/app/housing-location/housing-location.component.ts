import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="room-card">
      <img [src]="housingLocation.photo" alt="Фото номера" class="room-photo">
      <h2 class="room-title">{{ housingLocation.name }}</h2>
      <div class="room-details">
        <p>{{ housingLocation.description }}</p>
        <div class="room-features">
          <span class="feature-badge" *ngFor="let feature of housingLocation.features">{{ feature }}</span>
        </div>
        <p class="room-price">{{ housingLocation.price }} руб./ночь</p>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: {
    id: number;
    name: string;
    description: string;
    photo: string;
    price: number;
    features: string[];
  };
}

