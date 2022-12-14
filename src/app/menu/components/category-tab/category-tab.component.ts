import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
  @Input() category!: Category;
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
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO
    });
  }

  openNewCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO
    });
  }
}
