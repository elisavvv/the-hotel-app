import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="loading" class="loading">Загрузка...</div>
    
    <div *ngIf="room" class="booking-container">
      <h2>Бронирование: {{ room.name }}</h2>
      
      <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
        <input formControlName="name" placeholder="Ваше имя">
        <div *ngIf="bookingForm.get('name')?.hasError('required') && bookingForm.get('name')?.touched">
          Обязательное поле
        </div>

        <input formControlName="email" placeholder="Email" type="email">
        <div *ngIf="bookingForm.get('email')?.invalid && bookingForm.get('email')?.touched">
          Введите корректный email
        </div>

        <input formControlName="dates" placeholder="Даты" type="text">
        <div *ngIf="bookingForm.get('dates')?.hasError('required') && bookingForm.get('dates')?.touched">
          Укажите даты бронирования
        </div>

        <button type="submit" [disabled]="bookingForm.invalid">Забронировать</button>
      </form>
    </div>
  `,
  styles: [`
    .booking-container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; }
    .loading { text-align: center; padding: 20px; }
    input { display: block; width: 100%; margin: 10px 0; padding: 8px; }
    button { background: #11A6E1; color: white; border: none; padding: 10px 20px; }
    button:disabled { background: #ccc; }
  `]
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  room: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dates: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.hotelService.getRoomById(Number(id));
      })
    ).subscribe(room => {
      this.room = room;
      this.loading = false;
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.hotelService.bookRoom({
        ...this.bookingForm.value,
        roomId: this.room.id
      }).subscribe(() => {
        alert('Бронирование успешно!');
      });
    }
  }
}