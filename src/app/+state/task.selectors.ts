import { createFeatureSelector, createSelector } from '@ngrx/store';
import {FEATURE_KEY, taskAdapter, State} from "./task.reducer";

// Select the tasks state slice
export const selectTasksState = createFeatureSelector<State>(FEATURE_KEY);
const { selectAll, selectEntities } = taskAdapter.getSelectors();

export const selectAllTasks = createSelector(selectTasksState, (state: State) =>
  selectAll(state),
);

export const selectTaskEntities = createSelector(
  selectTasksState,
  (state) => state ? selectEntities(state) : {}
);

export const selectTaskLoading = createSelector(
  selectTasksState,
  (state: State) => state.loading,
);
