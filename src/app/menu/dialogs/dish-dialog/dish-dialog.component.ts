import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import Category from 'src/app/shared/interfaces/category.interface';

import Dish from 'src/app/shared/interfaces/dish.interface';
import DialogType from '../../enums/dialog-type';
import { DataService } from '../../services/data.service';

interface DishDialogData {
  type: DialogType;
  dish?: Dish;
}

@Component({
  selector: 'app-dish-dialog',
  templateUrl: './dish-dialog.component.html',
  styleUrls: ['./dish-dialog.component.scss'],
})
export class DishDialogComponent {
  dishForm!: FormGroup;
  filteredOptions!: Observable<string[]>;

  constructor(
    public dishDialogRef: MatDialogRef<DishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DishDialogData
  ) {}
  ngOnInit(): void {
    this.dishForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
    });

    if (this.data.type === DialogType.Edit) {
      this.dishForm = new FormGroup({
        name: new FormControl(this.data.dish?.name),
        description: new FormControl(this.data.dish?.description),
        price: new FormControl(this.data.dish?.price),
      });
    }
  }

  onClose(): void {
    this.dishDialogRef.close();
  }
  onSubmit(): void {
    this.dishDialogRef.close({
      ...this.dishForm.value,
      id: this.data.dish?.id,
    });
  }
}
