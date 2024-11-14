import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import { ItemActions } from './item.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {ItemService} from "../services/item.service";

@Injectable()
export class ItemEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private itemService = inject(ItemService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() => this.itemService.fetchItems()
        .pipe(
          tap(data => console.log('Fetched items:', data)),
          map(data => ItemActions.loadItemsSuccess({ items: data })),
          catchError(error => of(ItemActions.loadItemsFailure({ error: error.message })))
        )
      )
    ),
    { functional: true }
  );

  ngrxOnInitEffects = () => ItemActions.onInit();
}

