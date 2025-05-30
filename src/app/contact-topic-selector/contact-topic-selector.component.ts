import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-topic-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Тема обращения</mat-label>
      <mat-select 
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
      >
        <mat-option *ngFor="let topic of topics" [value]="topic.value">
          {{ topic.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactTopicSelectorComponent),
      multi: true
    }
  ],
  styleUrls: ['./contact-topic-selector.component.css']
})

export class ContactTopicSelectorComponent implements ControlValueAccessor {
  @Input() topics: Array<{ value: string; label: string }> = []; // Добавьте этот Input
  value: string = '';
  disabled = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}