import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../component/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Закрыть', {
      ...this.defaultConfig,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Закрыть', {
      ...this.defaultConfig,
      panelClass: ['error-snackbar']
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'Закрыть', {
      ...this.defaultConfig,
      panelClass: ['warning-snackbar']
    });
  }

  showErrorModal(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '400px'
    });
  }
}
