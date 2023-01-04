import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import Dish from 'src/app/shared/interfaces/dish.interface';
import DialogType from '../../enums/dialog-type';

interface DishDialogData {
  type: DialogType;
  dish?: Dish;
}

@Component({
  selector: 'app-dish-dialog',
  templateUrl: './dish-dialog.component.html',
  styleUrls: ['./dish-dialog.component.scss'],
})
export class DishDialogComponent implements OnInit {
  dishForm!: FormGroup;
  filteredOptions!: Observable<string[]>;

  constructor(
    public dishDialogRef: MatDialogRef<DishDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DishDialogData
  ) {}

  public ngOnInit(): void {
    this.dishForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(9999),
      ]),
    });

    if (this.data.type === DialogType.Edit) {
      this.dishForm = new FormGroup({
        name: new FormControl(this.data.dish?.name, Validators.required),
        description: new FormControl(this.data.dish?.description),
        price: new FormControl(this.data.dish?.price, [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
        ]),
      });
    }
  }

  public onClose(): void {
    this.dishDialogRef.close();
  }
  public onSubmit(): void {
    if (this.dishForm.valid) {
      this.dishDialogRef.close({
        ...this.dishForm.value,
        id: this.data.dish?.id,
      });
    }
  }
}
