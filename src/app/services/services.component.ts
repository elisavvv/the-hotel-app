import { Component, OnInit, DestroyRef, inject  } from '@angular/core';
import { HotelService, HotelServiceItem  } from '../services/hotel.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  services$: Observable<HotelServiceItem[]> = of([]);
  selectedServices: HotelServiceItem[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.services$ = this.hotelService.getHotelServices();
    
    this.services$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(services => console.log('Services data:', services));
    
    this.selectedServices = this.hotelService.getSelectedServices();
  }
  handleImageError(event: Event, service: HotelServiceItem): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default.jpg'; 
    service.photo = 'assets/images/default.jpg';
  }
  drop(event: CdkDragDrop<HotelServiceItem[]>): void {
    if (!event.container.data || !event.previousContainer.data){ return;}

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
      this.hotelService.setSelectedServices(this.selectedServices);
    }
  }
}

