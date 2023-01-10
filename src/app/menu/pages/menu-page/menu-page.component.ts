import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { State } from 'src/app/reducers';

import Category from 'src/app/shared/interfaces/category.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import DialogType from '../../enums/dialog-type';
import {
  addCategory,
  removeCategory,
  updateCategory,
} from '../../store/action/category.actions';
import { selectCategories } from '../../store/selector/category.selectors';

interface MenuPageQueryParams {
  category?: string;
}

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit, OnDestroy {
  categories$!: Observable<Category[]>;
  currentCategoryIndex = 0;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthService,
    private store: Store<State>
  ) {}

  public ngOnInit(): void {
    this.categories$ = this.store.pipe(select(selectCategories));
    this.store
      .pipe(
        filter((store) => !store.category.loading),
        take(1)
      )
      .subscribe(() => {
        this.updateTabIndex(
          <MenuPageQueryParams>this.route.snapshot.queryParams
        );
      });
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.updateTabIndex(params);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateTabIndex(params: MenuPageQueryParams) {
    this.categories$.pipe(take(1)).subscribe((categories) => {
      if (!params.category) {
        this.router.navigate([], {
          queryParams: { category: categories[0]?.id },
        });
        return;
      }
      const categoryId = parseInt(params?.category ?? '');
      this.currentCategoryIndex = categories.findIndex(
        (c) => c.id === categoryId
      );
    });
  }

  public onTabChange(tabIndex: number): void {
    this.categories$.pipe(take(1)).subscribe((categories) => {
      this.router.navigate([], {
        queryParams: {
          category: categories[tabIndex]?.id,
        },
        fragment: this.route.snapshot.fragment as string,
      });

      this.currentCategoryIndex = tabIndex;
    });
  }

  public onCategoryUpdated(category: Category) {
    this.store.dispatch(updateCategory({ category }));
  }

  public onCategoryCreated(category: Category) {
    this.store.dispatch(addCategory({ category }));
    this.store
      .pipe(
        filter((store) => !store.category.loading),
        take(1)
      )
      .subscribe(({ category }) => {
        this.onTabChange(category.categories.length - 1);
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
    this.store.dispatch(removeCategory({ id: category.id }));
    this.onTabChange(0);
  }
}
