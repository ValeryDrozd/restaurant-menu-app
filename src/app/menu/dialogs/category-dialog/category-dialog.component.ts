import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Category from 'src/app/shared/interfaces/category.interface';
import DialogType from '../../enums/dialog-type';

interface CategoryData {
  type: DialogType;
  category?: Category;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(
    public categoryDialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryData
  ) {}

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(
        this.data.type === DialogType.Edit ? this.data.category?.name : ''
      ),
    });
  }

  onClose(): void {
    this.categoryDialogRef.close();
  }
  onSubmit(): void {
    this.categoryDialogRef.close({
      ...this.categoryForm.value,
      id: this.data.category?.id,
    });
  }
}
