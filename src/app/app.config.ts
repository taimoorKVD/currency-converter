import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: any = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),provideRouter(routes),provideClientHydration(),provideAnimationsAsync(), provideAnimationsAsync()]
};
