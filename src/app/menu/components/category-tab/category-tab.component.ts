import { Component, Input, OnInit } from '@angular/core';
import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit {
  @Input() category!: Category;
  dishes: Dish[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getDishesByCategory(this.category.id)
      .subscribe((dishes) => {
        this.dishes = dishes;
      });
  }
}
