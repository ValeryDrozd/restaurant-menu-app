import {
  CategoriesState,
  categoryFeatureKey,
} from '../menu/store/reducer/category.reducer';
import {
  DishesState,
  dishFeatureKey,
} from '../menu/store/reducer/dish.reducer';

export interface State {
  [categoryFeatureKey]: CategoriesState;
  [dishFeatureKey]: DishesState;
}
