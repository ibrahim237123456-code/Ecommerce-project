import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';




class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([LoadingInterceptor as any, AuthInterceptor as any])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideAnimations(),
  ]
};
