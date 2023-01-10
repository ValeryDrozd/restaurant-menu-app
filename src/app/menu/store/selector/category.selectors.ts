import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCaterogies from '../reducer/category.reducer';

export const selectCaterogiesState =
  createFeatureSelector<fromCaterogies.CategoriesState>(
    fromCaterogies.categoryFeatureKey
  );

export const selectCategories = createSelector(
  selectCaterogiesState,
  (state: fromCaterogies.CategoriesState) => state.categories
);
