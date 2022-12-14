import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Dish from 'src/app/shared/interfaces/dish.interface';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() dish!: Dish;

  constructor(public dialog: MatDialog) {}

  openEditDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      data: this.dish,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO
    });
  }
}
