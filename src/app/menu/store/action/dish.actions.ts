import { createAction, props } from '@ngrx/store';
import Dish from 'src/app/shared/interfaces/dish.interface';

export const addDish = createAction('[Dish] Add Dish', props<{ dish: Dish }>());

export const updateDish = createAction(
  '[Dish] Update Dish',
  props<{ dish: Dish }>()
);

export const removeDish = createAction(
  '[Dish] Remove Dish',
  props<{ id: number }>()
);

export const fetchDishes = createAction(
  '[Dish] Fetch Dishes',
  props<{ categoryId: number }>()
);

export const fetchDishesSuccess = createAction(
  '[Dish] Fetch Dishes Success',
  props<{ dishes: Dish[] }>()
);

export const fetchDishesFailure = createAction(
  '[Dish] Fetch Dishes Failure',
  props<{ error: string }>()
);

export const addDishSuccess = createAction(
  '[Dish] Add Dish Success',
  props<{ dish: Dish }>()
);

export const addDishFailure = createAction(
  '[Dish] Add Dish Failure',
  props<{ error: string }>()
);

export const updateDishSuccess = createAction(
  '[Dish] Update Dish Success',
  props<{ dish: Dish }>()
);

export const updateDishFailure = createAction(
  '[Dish] Update Dish Failure',
  props<{ error: string }>()
);

export const removeDishSuccess = createAction(
  '[Dish] Remove Dish Success',
  props<{ id: number }>()
);

export const removeDishFailure = createAction(
  '[Dish] Remove Dish Failure',
  props<{ error: string }>()
);
