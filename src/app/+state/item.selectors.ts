import { createFeatureSelector, createSelector } from '@ngrx/store';
import {FEATURE_KEY, itemAdapter, State} from "./item.reducer";

// Select the items state slice
export const selectItemsState = createFeatureSelector<State>(FEATURE_KEY);
const { selectAll, selectEntities } = itemAdapter.getSelectors();

export const selectAllItems = createSelector(selectItemsState, (state: State) =>
  selectAll(state),
);

export const selectItemEntities = createSelector(
  selectItemsState,
  (state) => state ? selectEntities(state) : {}
);

export const selectItemLoading = createSelector(
  selectItemsState,
  (state: State) => state.loading,
);
