import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import {
  addCategory,
  addCategorySuccess,
  initCategories,
  removeCategory,
  removeCategorySuccess,
  setCategories,
  updateCategory,
  updateCategorySuccess,
} from '../action/category.actions';

@Injectable()
export class CategoryEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return initCategories();
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCategories),
      mergeMap(() => {
        return this.dataService
          .getCategories()
          .pipe(map((categories) => setCategories({ categories })));
      })
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategory),
      mergeMap(({ category }) => {
        return this.dataService
          .addNewCategory(category)
          .pipe(
            map((newCategory) => addCategorySuccess({ category: newCategory }))
          );
      })
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      mergeMap(({ category }) => {
        return this.dataService
          .updateCategory(category)
          .pipe(
            map((newCategory) =>
              updateCategorySuccess({ category: newCategory })
            )
          );
      })
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCategory),
      mergeMap(({ id }) => {
        return this.dataService
          .deleteCategory(id)
          .pipe(map(() => removeCategorySuccess({ id })));
      })
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
