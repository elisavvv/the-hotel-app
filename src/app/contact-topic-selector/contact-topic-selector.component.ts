import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-topic-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl:'./contact-topic-selector.component.html',
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
  @Input() topics: Array<{ value: string; label: string }> = []; 
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