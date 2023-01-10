import { createReducer, on } from '@ngrx/store';
import Category from 'src/app/shared/interfaces/category.interface';
import {
  addCategory,
  addCategorySuccess,
  removeCategorySuccess,
  setCategories,
  updateCategorySuccess,
} from '../action/category.actions';

export const categoryFeatureKey = 'category';

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
}

export const initialState: CategoriesState = { categories: [], loading: true };

export const categoriesReducer = createReducer(
  initialState,
  on(setCategories, (state, { categories }) => {
    return { ...state, categories, loading: false };
  }),
  on(addCategory, (state) => ({ ...state, loading: true })),
  on(addCategorySuccess, (state, { category }) => {
    return {
      ...state,
      categories: [...state.categories, category],
      loading: false,
    };
  }),
  on(updateCategorySuccess, (state, { category }) => {
    const index = state.categories.findIndex((c) => c.id === category.id);
    const newCategories = [...state.categories];
    newCategories.splice(index, 1, category);
    return { ...state, categories: newCategories };
  }),
  on(removeCategorySuccess, (state, { id }) => {
    const index = state.categories.findIndex((c) => c.id === id);
    const newCategories = [...state.categories];
    newCategories.splice(index, 1);
    return { ...state, categories: newCategories };
  })
);
