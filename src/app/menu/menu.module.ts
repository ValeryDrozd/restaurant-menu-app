import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MaterialModule } from '../shared/material.module';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { MenuDialogComponent } from './dialogs/menu-dialog/menu-dialog.component';
import { DishDialogComponent } from './dialogs/dish-dialog/dish-dialog.component';
import { AuthModule } from '../auth/auth.module';
import { StoreModule } from '@ngrx/store';
import {
  categoriesReducer,
  categoryFeatureKey,
} from './store/reducer/category.reducer';
import { dishesReducer, dishFeatureKey } from './store/reducer/dish.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/effect/category.effects';
import { DishEffects } from './store/effect/dish.effects';

@NgModule({
  declarations: [
    MenuPageComponent,
    CategoryTabComponent,
    DishCardComponent,
    CategoryDialogComponent,
    MenuDialogComponent,
    DishDialogComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    StoreModule.forFeature(categoryFeatureKey, categoriesReducer),
    StoreModule.forFeature(dishFeatureKey, dishesReducer),
    EffectsModule.forFeature([CategoryEffects, DishEffects]),
  ],
})
export class MenuModule {}
