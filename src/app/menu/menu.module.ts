import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MaterialModule } from '../shared/material.module';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';

@NgModule({
  declarations: [MenuPageComponent, CategoryTabComponent, DishCardComponent],
  imports: [CommonModule, MenuRoutingModule, MaterialModule, HttpClientModule],
})
export class MenuModule {}
