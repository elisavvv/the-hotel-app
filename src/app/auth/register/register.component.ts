// src/app/auth/register/register.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Регистрация</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field>
            <input matInput placeholder="Имя пользователя" formControlName="username" required>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="email" placeholder="Email" formControlName="email" required>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="password" placeholder="Пароль" formControlName="password" required>
          </mat-form-field>
          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" type="submit">Зарегистрироваться</button>
          <a mat-button routerLink="/login">Уже есть аккаунт? Войти</a>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [`
    .register-card {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .error {
      color: red;
      margin: 1rem 0;
    }
  `]
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

// обновляем onSubmit:
  onSubmit(): void{
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username!, email!, password!).subscribe({
        next: (response) => {
          // Автоматическая авторизация после регистрации
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Ошибка регистрации';
        }
      });
    }
  }
}