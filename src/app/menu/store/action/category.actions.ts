import { createAction, props } from '@ngrx/store';
import Category from 'src/app/shared/interfaces/category.interface';

export const initCategories = createAction('[Category] Init Categories');

export const setCategories = createAction(
  '[Category] Set Categories',
  props<{ categories: Category[] }>()
);

export const addCategory = createAction(
  '[Category] Add Category',
  props<{ category: Category }>()
);
export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ category: Category }>()
);
export const removeCategory = createAction(
  '[Category] Remove Category',
  props<{ id: number }>()
);

export const addCategorySuccess = createAction(
  '[Category] Add Category Success',
  props<{ category: Category }>()
);

export const addCategoryFailure = createAction(
  '[Category] Add Category Failure',
  props<{ error: string }>()
);

export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: string }>()
);

export const removeCategorySuccess = createAction(
  '[Category] Remove Category Success',
  props<{ id: number }>()
);

export const removeCategoryFailure = createAction(
  '[Category] Remove Category Failure',
  props<{ error: string }>()
);
