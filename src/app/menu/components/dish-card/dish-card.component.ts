import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Dish from 'src/app/shared/interfaces/dish.interface';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';
import DialogType from '../../enums/dialog-type';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() dish!: Dish;
  @Output() dishUpdate = new EventEmitter();
  @Output() dishRemove = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  openEditDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      data: {
        type: DialogType.Edit,
        dish: this.dish,
      },
    });

    dialogRef.afterClosed().subscribe((dish) => {
      if (dish) {
        this.dishUpdate.emit(dish);
      }
    });
  }

  onDishRemoved() {
    this.dishRemove.emit(this.dish);
  }
}
