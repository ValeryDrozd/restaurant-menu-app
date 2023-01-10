import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDishes from '../reducer/dish.reducer';

export const selectDishesState = createFeatureSelector<fromDishes.DishesState>(
  fromDishes.dishFeatureKey
);

export const selectDishes = createSelector(
  selectDishesState,
  (state: fromDishes.DishesState) => state.dishes
);
