import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import {
  addDish,
  addDishSuccess,
  fetchDishes,
  fetchDishesSuccess,
  removeDish,
  removeDishSuccess,
  updateDish,
  updateDishSuccess,
} from '../action/dish.actions';

@Injectable()
export class DishEffects {
  fetchDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDishes),
      mergeMap(({ categoryId }) => {
        return this.dataService
          .getDishesByCategory(categoryId)
          .pipe(map((dishes) => fetchDishesSuccess({ dishes })));
      })
    )
  );

  addDish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDish),
      mergeMap(({ dish }) => {
        return this.dataService
          .addNewDish(dish)
          .pipe(map((newDish) => addDishSuccess({ dish: newDish })));
      })
    )
  );

  updateDish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDish),
      mergeMap(({ dish }) => {
        return this.dataService
          .updateDish(dish)
          .pipe(map((newDish) => updateDishSuccess({ dish: newDish })));
      })
    )
  );

  removeDish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeDish),
      mergeMap(({ id }) => {
        return this.dataService
          .deleteDish(id)
          .pipe(map(() => removeDishSuccess({ id })));
      })
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
