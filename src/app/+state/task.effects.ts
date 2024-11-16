import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import { TaskActions } from './task.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {TaskService} from "../services/task.service";

@Injectable()
export class TaskEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private itemService = inject(TaskService);

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => this.itemService.fetchAllTasks()
        .pipe(
          tap(data => console.log('Fetched tasks:', data)),
          map(data => TaskActions.loadTasksSuccess({ tasks: data })),
          catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
        )
      )
    ),
    { functional: true }
  );

  addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        mergeMap(({ task }) => this.itemService.addTask(task)
          .pipe(
            tap(data => console.log('Added task:', data)),
            map(addedTask => TaskActions.addTaskSuccess({ task: addedTask })),
            catchError(error => of(TaskActions.addTaskFailure({ error: error.message })))
          )
        )
      ),
    { functional: true }
  );

  // Effect to delete a task
  deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        mergeMap(({ id }) => this.itemService.deleteTask(id)
          .pipe(
            tap(() => console.log(`Deleted task with id: ${id}`)),
            map(() => TaskActions.deleteTaskSuccess({ id })), // Dispatch success action with the task id
            catchError(error => of(TaskActions.deleteTaskFailure({ error: error.message })))
          )
        )
      ),
    { functional: true }
  );

  ngrxOnInitEffects = () => TaskActions.onInit();
}

