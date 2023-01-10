import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, filter, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { State } from 'src/app/reducers';

import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';
import DialogType from '../../enums/dialog-type';
import {
  addDish,
  fetchDishes,
  removeDish,
  updateDish,
} from '../../store/action/dish.actions';
import { selectDishes } from '../../store/selector/dish.selectors';
import { DishCardComponent } from '../dish-card/dish-card.component';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit, OnDestroy {
  @Input() category!: Category;
  @Output() categoryUpdate = new EventEmitter();
  @Output() categoryRemove = new EventEmitter();
  @ViewChildren(DishCardComponent) dishCards!: QueryList<DishCardComponent>;

  dishes$!: Observable<Dish[]>;
  scrollToDishSubscribtion: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private store: Store<State>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchDishes({ categoryId: this.category.id }));

    this.dishes$ = this.store.pipe(select(selectDishes));
    this.store
      .pipe(
        filter((store) => !store.dish.loading),
        take(1)
      )
      .subscribe(({ dish }) => {
        const { dishes } = dish;
        if (
          dishes.find(
            (d) => d.id === parseInt(this.route.snapshot.fragment as string)
          )
        ) {
          const subscribtion = this.dishCards.changes
            .pipe(debounceTime(400))
            .subscribe(() => {
              this.scrollIntoCard(this.route.snapshot.fragment);
            });
          this.scrollToDishSubscribtion.push(subscribtion);
        } else {
          this.router.navigate([], {
            queryParams: {
              category: this.category.id,
            },
          });
        }
      });

    const subscribtion = this.route.fragment.subscribe((value) =>
      this.scrollIntoCard(value)
    );
    this.scrollToDishSubscribtion.push(subscribtion);
  }

  public ngOnDestroy() {
    this.scrollToDishSubscribtion.forEach((element) => {
      element.unsubscribe();
    });
  }

  public scrollIntoCard(fragment: string | null) {
    if (fragment && this.dishCards) {
      const currentCard = this.dishCards.find(
        (d) => d.dish.id === parseInt(fragment)
      );

      window.scroll({
        behavior: 'smooth',
        top: <number>currentCard?.cardRef.nativeElement.offsetTop - 10,
      });
    }
  }

  public openNewDishDialog(): void {
    const dialogRef = this.dialog.open(DishDialogComponent, {
      data: {
        type: DialogType.New,
      },
    });

    dialogRef.afterClosed().subscribe((dish) => {
      if (dish) {
        this.onDishCreated(dish);
      }
    });
  }

  public openEditCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        type: DialogType.Edit,
        category: this.category,
      },
    });

    dialogRef.afterClosed().subscribe((category) => {
      if (category) {
        this.categoryUpdate.emit(category);
      }
    });
  }

  public onDishCreated(dish: Dish) {
    this.store.dispatch(addDish({ dish }));
  }

  public onDishRemoved(dish: Dish) {
    this.store.dispatch(removeDish({ id: dish.id }));
  }

  public onDishUpdated(dish: Dish) {
    this.store.dispatch(updateDish({ dish }));
  }

  public onCategoryRemoved() {
    this.categoryRemove.emit(this.category);
  }
}
