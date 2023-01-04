import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import Category from 'src/app/shared/interfaces/category.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import DialogType from '../../enums/dialog-type';
import { DataService } from '../../services/data.service';

interface MenuPageQueryParams {
  category?: string;
}

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  currentCategoryIndex = 0;
  subscription!: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.updateTabIndex(params);
    });

    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.updateTabIndex(<MenuPageQueryParams>this.route.snapshot.queryParams);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateTabIndex(params: MenuPageQueryParams) {
    if (!params.category) {
      this.router.navigate([], {
        queryParams: { category: this.categories[0]?.id },
      });
      return;
    }
    const categoryId = parseInt(params?.category ?? '');
    this.currentCategoryIndex = this.categories.findIndex(
      (c) => c.id === categoryId
    );
  }

  public onTabChange(tabIndex: number): void {
    this.router.navigate([], {
      queryParams: {
        category: this.categories[tabIndex]?.id,
      },
      fragment: this.route.snapshot.fragment as string,
    });

    this.currentCategoryIndex = tabIndex;
  }

  public onCategoryUpdated(category: Category) {
    this.dataService.updateCategory(category).subscribe((editedCategory) => {
      const index = this.categories.findIndex(
        (c) => c.id === editedCategory.id
      );
      this.categories.splice(index, 1, editedCategory);
    });
  }

  public onCategoryCreated(category: Category) {
    this.dataService.addNewCategory(category).subscribe((newCategory) => {
      this.categories.push(newCategory);
      this.onTabChange(this.categories.length - 1);
    });
  }

  public openNewCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        type: DialogType.New,
      },
    });
    dialogRef.afterClosed().subscribe((category) => {
      if (category) {
        this.onCategoryCreated(category);
      }
    });
  }

  public onCategoryRemoved(category: Category): void {
    this.dataService.deleteCategory(category.id).subscribe(() => {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories.splice(index, 1);
      this.onTabChange(0);
    });
  }
}
