import { createReducer, on } from '@ngrx/store';
import Dish from 'src/app/shared/interfaces/dish.interface';
import {
  addDishSuccess,
  fetchDishes,
  fetchDishesSuccess,
  removeDishSuccess,
  updateDishSuccess,
} from '../action/dish.actions';

export const dishFeatureKey = 'dish';

export interface DishesState {
  dishes: Dish[];
  loading: boolean;
}

export const initialState: DishesState = { dishes: [], loading: true };

export const dishesReducer = createReducer(
  initialState,
  on(fetchDishes, (state) => ({ ...state, loading: true })),
  on(fetchDishesSuccess, (state, { dishes }) => {
    return { ...state, dishes, loading: false };
  }),
  on(addDishSuccess, (state, { dish }) => {
    return { ...state, dishes: [...state.dishes, dish] };
  }),
  on(updateDishSuccess, (state, { dish }) => {
    const index = state.dishes.findIndex((d) => d.id === dish.id);
    const newDishes = [...state.dishes];
    newDishes.splice(index, 1, dish);
    return { ...state, dishes: newDishes };
  }),
  on(removeDishSuccess, (state, { id }) => {
    const index = state.dishes.findIndex((d) => d.id === id);
    const newDishes = [...state.dishes];
    newDishes.splice(index, 1);
    return { ...state, dishes: newDishes };
  })
);
