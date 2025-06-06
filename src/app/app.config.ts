import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { authInterceptor } from './auth/auth.interceptor'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './core/handlers/global-error-handler';
import { errorInterceptor } from '././core/interceptors/error.interceptor';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideNativeDateAdapter(),
    provideAnimations(),
    importProvidersFrom(MatDialogModule,
      MatDatepickerModule,
      MatSnackBarModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule
    ),
  ]
};
