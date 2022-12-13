import { Component, OnInit } from '@angular/core';

import Category from 'src/app/shared/interfaces/category.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  categories: Category[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
