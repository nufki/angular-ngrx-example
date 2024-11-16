import { provideState } from '@ngrx/store';
import * as fromItems from './task.reducer';


export const STATE_PROVIDERS = [
  provideState({
    name: fromItems.FEATURE_KEY,
    reducer: fromItems.taskReducer,
  }),
];
