import {createReducer, on} from '@ngrx/store';
import {ItemActions} from "./item.actions";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Item} from "./item.model";

export const FEATURE_KEY = 'items';

export interface State extends EntityState<Item> {
  loading: boolean;
}

export const itemAdapter: EntityAdapter<Item> =
  createEntityAdapter<Item>();

export const initialState: State = itemAdapter.getInitialState({
  loading: false,
});

export const dataReducer = createReducer(
  initialState,
  on(ItemActions.loadItems, (state) =>  {
    return {
      ...state,
      loading: true
    };
  }),
  on(ItemActions.loadItemsSuccess, (state, { items }) => {
    return itemAdapter.upsertMany(items, {
      ...state,
      loading: true,
    });
  }),
  on(ItemActions.loadItemsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(ItemActions.reverseOrder, (state) => {
    // Select all items and reverse them
    const reversedItems = itemAdapter
      .getSelectors()
      .selectAll(state)
      .reverse();

    // Use setAll to update the state with reversed items
    return itemAdapter.setAll(reversedItems, state);
  })
);

export function itemReducer(state: any, action: any) {
  return dataReducer(state || initialState, action);
}
