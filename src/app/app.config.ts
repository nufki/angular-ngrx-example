import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import { provideEffects } from '@ngrx/effects';
import {ItemEffects} from "./store/item.effects";
import {FEATURE_KEY, itemReducer} from "./store/item.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([ItemEffects]),
    provideState({
      name: FEATURE_KEY,
      reducer: itemReducer,
    }),
    provideStore(),
    provideState({ name: 'router', reducer: routerReducer }),
    provideRouterStore({}),
    provideStoreDevtools({}),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
