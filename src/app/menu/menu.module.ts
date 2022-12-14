import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MaterialModule } from '../shared/material.module';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { MenuDialogComponent } from './dialogs/menu-dialog/menu-dialog.component';
import { DishDialogComponent } from './dialogs/dish-dialog/dish-dialog.component';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
})
export class MenuModule {}
