import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService, HotelServiceItem } from '../services/hotel.service';
import { switchMap} from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  room: any;
  minDate: Date;
  maxDate: Date;
  dateRangeDisplay: string = '';
  selectedServices: HotelServiceItem[] = [];
  totalPrice: number = 0;
  private destroyRef = inject(DestroyRef); // Добавляем DestroyRef

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    // Устанавливаем русскую локаль для дат
    this.dateAdapter.setLocale('ru-RU');

    // Минимальная дата - сегодня
    this.minDate = new Date();
    
    // Максимальная дата - +1 год от сегодня
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateRange: this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    }, { validators: [this.dateRangeValidator] })
  });

    // Обновляем подписку с takeUntilDestroyed
    this.bookingForm.get('dateRange')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateDateDisplay();
      });
  }

  // Фильтр дат (только будущие даты)
  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date());

    return day >= this.minDate && day <= this.maxDate;
  };

  dateRangeValidator(group: AbstractControl): { [key: string]: any } | null {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    
    if (start && end && new Date(start) > new Date(end)) {
      return { 'dateRange': true }; // Используем строковый ключ
    }

    return null;
  }
  // Обновление отображения дат
  updateDateDisplay(): void {
    const start = this.bookingForm.get('dateRange.start')?.value;
    const end = this.bookingForm.get('dateRange.end')?.value;
    
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      this.dateRangeDisplay = 
        `${this.formatDate(startDate)}-${this.formatDate(endDate)}`;
    } else {
      this.dateRangeDisplay = '';
    }
  }

  // Форматирование даты в "дд.мм.гг"
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(date).replace(/\./g, '.');
  }

  ngOnInit(): void {
    // Обновляем подписку на параметры маршрута
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.hotelService.getRoomById(Number(id));
      }),
      takeUntilDestroyed(this.destroyRef) // Добавляем автоматическую отписку
    ).subscribe(room => {
      this.room = room;
    });

    // Обновляем подписку на бронирование
    this.selectedServices = this.hotelService.getSelectedServices();
    this.calculateTotal();
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValue = {
        ...this.bookingForm.value,
        roomId: this.room.id,
        startDate: this.bookingForm.value.dateRange.start,
        endDate: this.bookingForm.value.dateRange.end,
        totalDays: this.calculateDays(),
        totalPrice: this.calculateTotalPrice()
      };
      
      this.hotelService.bookRoom(formValue)
        .pipe(takeUntilDestroyed(this.destroyRef)) // Добавляем для HTTP-запроса
        .subscribe(() => {
          alert(`Бронирование успешно оформлено! С ${this.formatDate(new Date(formValue.startDate))} по ${this.formatDate(new Date(formValue.endDate))}`);
        });
    }
  }

  calculateDays(): number {
    const start = new Date(this.bookingForm.value.dateRange.start);
    const end = new Date(this.bookingForm.value.dateRange.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateTotalPrice(): number {
    return this.calculateDays() * this.room.price;
  }
  calculateTotal(): void {
    this.totalPrice = this.selectedServices.reduce(
      (sum, service) => sum + service.price, 0
    );
  }
}