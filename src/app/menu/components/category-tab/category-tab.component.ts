import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';
import DialogType from '../../enums/dialog-type';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
  @Input() category!: Category;
  @Output() categoryCreate = new EventEmitter();
  @Output() categoryUpdate = new EventEmitter();
  dishes: Dish[] = [];
  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService
      .getDishesByCategory(this.category.id)
      .subscribe((dishes) => {
        this.dishes = dishes;
      });
  }

  openNewDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      data: {
        type: DialogType.New,
      },
    });

    dialogRef.afterClosed().subscribe((dish) => {
      if (dish) {
        this.onDishCreated(dish);
      }
    });
  }

  openEditCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        type: DialogType.Edit,
        category: this.category,
      },
    });

    dialogRef.afterClosed().subscribe((category) => {
      if (category) {
        this.categoryUpdate.emit(category);
      }
    });
  }

  onDishCreated(dish: Dish) {
    this.dataService
      .addNewDish({ ...dish, categoryId: this.category.id })
      .subscribe((newDish) => {
        this.dishes.push(newDish);
      });
  }
}
