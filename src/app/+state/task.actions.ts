import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Task} from './task.model';

// Actions
export const TaskActions = createActionGroup({
  source: 'Item',
  events: {
    'On Init': emptyProps,
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Reverse order': emptyProps,
    'Add Task': props<{ task: Task }>(),
    'Add Task Success': props<{ task: Task }>(),
    'Add Task Failure': props<{ error: string }>(),
  },
});
