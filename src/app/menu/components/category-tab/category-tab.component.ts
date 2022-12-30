import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';
import { CategoryDialogComponent } from '../../dialogs/category-dialog/category-dialog.component';
import { DishDialogComponent } from '../../dialogs/dish-dialog/dish-dialog.component';
import DialogType from '../../enums/dialog-type';
import { DataService } from '../../services/data.service';
import { DishCardComponent } from '../dish-card/dish-card.component';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
  @Input() category!: Category;
  @Output() categoryUpdate = new EventEmitter();
  @Output() categoryRemove = new EventEmitter();
  @ViewChildren(DishCardComponent) dishCards!: QueryList<DishCardComponent>;

  dishes: Dish[] = [];
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.dataService
      .getDishesByCategory(this.category.id)
      .subscribe((dishes) => {
        this.dishes = dishes;
        if (
          this.dishes.find(
            (d) => d.id === parseInt(this.route.snapshot.fragment as string)
          )
        ) {
          this.dishCards.changes.pipe(debounceTime(400)).subscribe(() => {
            this.scrollIntoCard(this.route.snapshot.fragment);
          });
        } else {
          this.router.navigate([], {
            queryParams: {
              category: this.category.id,
            },
          });
        }
      });
    this.route.fragment.subscribe((value) => this.scrollIntoCard(value));
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
    this.dataService
      .addNewDish({ ...dish, categoryId: this.category.id })
      .subscribe((newDish) => {
        this.dishes.push(newDish);
      });
  }

  public onDishRemoved(dish: Dish) {
    this.dataService.deleteDish(dish.id).subscribe(() => {
      const index = this.dishes.findIndex((d) => d.id === dish.id);
      this.dishes.splice(index, 1);
    });
  }

  public onDishUpdated(dish: Dish) {
    this.dataService.updateDish(dish).subscribe((updatedDish) => {
      const index = this.dishes.findIndex((d) => d.id === dish.id);
      this.dishes.splice(index, 1, updatedDish);
    });
  }

  public onCategoryRemoved() {
    this.categoryRemove.emit(this.category);
  }
}
