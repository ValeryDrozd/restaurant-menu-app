import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import Category from 'src/app/shared/interfaces/category.interface';
import { DataService } from '../../services/data.service';

interface MenuPageQueryParams {
  category?: string;
}

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  categories: Category[] = [];
  currentCategoryIndex = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.updateTabIndex(params);
    });

    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.updateTabIndex(<MenuPageQueryParams>this.route.snapshot.queryParams);
    });
  }

  updateTabIndex(params: MenuPageQueryParams) {
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

  onTabChange(tabIndex: number): void {
    this.router.navigate([], {
      queryParams: {
        category: this.categories[tabIndex]?.id,
      },
    });

    this.currentCategoryIndex = tabIndex;
  }

  onCategoryUpdated(category: Category) {
    this.dataService.updateCategory(category).subscribe((editedCategory) => {
      const index = this.categories.findIndex(
        (c) => c.id === editedCategory.id
      );
      this.categories.splice(index, 1, editedCategory);
    });
  }
}
