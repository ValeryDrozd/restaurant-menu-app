import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import Dish from 'src/app/shared/interfaces/dish.interface';

@Component({
  selector: 'app-dish-dialog',
  templateUrl: './dish-dialog.component.html',
  styleUrls: ['./dish-dialog.component.scss'],
})
export class DishDialogComponent {
  dish: Partial<Dish> = {
    name: '',
    description: '',
    image: null,
    price: 0,
  };

  constructor(
    public dishDialogRef: MatDialogRef<DishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public oldDish: Dish
  ) {
    if (oldDish) {
      this.dish = oldDish;
    }
  }

  onClose(): void {
    this.dishDialogRef.close();
  }
}
