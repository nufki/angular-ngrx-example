import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Item} from './item.model';

// Actions
export const ItemActions = createActionGroup({
  source: 'Item',
  events: {
    'On Init': emptyProps,
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: Item[] }>(),
    'Load Items Failure': props<{ error: string }>(),
    'Reverse order': emptyProps,
    'Add Item': props<{ item: Item }>(),
    'Add Item Success': props<{ item: Item }>(),
    'Add Item Failure': props<{ error: string }>(),
  },
});
