import {createReducer, on} from '@ngrx/store';
import {TaskActions} from "./task.actions";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Task} from "./task.model";

export const FEATURE_KEY = 'tasks';

export interface State extends EntityState<Task> {
  loading: boolean;
}

export const taskAdapter: EntityAdapter<Task> =
  createEntityAdapter<Task>();

export const initialState: State = taskAdapter.getInitialState({
  loading: false,
});

export const dataReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) =>  {
    return {
      ...state,
      loading: true
    };
  }),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    return taskAdapter.upsertMany(tasks, {
      ...state,
      loading: false,
    });
  }),
  on(TaskActions.loadTasksSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(TaskActions.reverseOrder, (state) => {
    // Select all tasks and reverse them
    const reversedItems = taskAdapter
      .getSelectors()
      .selectAll(state)
      .reverse();

    // Use setAll to update the state with reversed tasks
    return taskAdapter.setAll(reversedItems, state);
  }),
  on(TaskActions.addTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, state)
  ),
);

export function taskReducer(state: any, action: any) {
  return dataReducer(state || initialState, action);
}
