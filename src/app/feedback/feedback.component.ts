import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio'; 
import { ContactTopicSelectorComponent } from '../contact-topic-selector/contact-topic-selector.component';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  imports: [
    CommonModule, 
    NgIf,
    NgFor,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    ContactTopicSelectorComponent,
    ReactiveFormsModule,
  ],
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  
  feedbackTopics = [
    { value: 'compliment', label: 'Благодарность' },
    { value: 'suggestion', label: 'Предложение по улучшению' },
    { value: 'complaint', label: 'Жалоба' },
    { value: 'question', label: 'Вопрос' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      console.log('Отзыв отправлен:', this.feedbackForm.value);
      this.snackBar.open('Спасибо за ваш отзыв! Мы ценим ваше мнение.', 'Закрыть', { 
        duration: 5000,
        panelClass: ['success-snackbar']
      });
      this.feedbackForm.reset({
        rating: 5
      });
    }
  }
}