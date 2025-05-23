import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Инжектим Injector, чтобы избежать циклической зависимости
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const notificationService = this.injector.get(NotificationService);
    console.error('Global error handler:', error);
    // Показываем уведомление только для ошибок приложения
    if (error instanceof Error) {
      notificationService.showError('Произошла непредвиденная ошибка');
    }
  }

  private logErrorToServer(error: any): void {
    // Реализация отправки ошибок на сервер
  }
}