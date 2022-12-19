import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounce, interval, Subject } from 'rxjs';
import { DataService } from 'src/app/menu/services/data.service';
import Dish from 'src/app/shared/interfaces/dish.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchingDishControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Subject<Dish[]> = new Subject();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.searchingDishControl.valueChanges
      .pipe(debounce(() => interval(300)))
      .subscribe((name) => {
        if (name && typeof name === 'string') {
          this.dataService.getDishesByName(name).subscribe((dishes) => {
            this.filteredOptions.next(dishes);
          });
        } else {
          this.filteredOptions.next([]);
        }
      });
  }

  displayDish(dish: Dish) {
    return dish.name;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const dish: Dish = event.option.value;
    this.router.navigate(['/menu'], {
      queryParams: {
        category: dish.categoryId,
      },
    });
  }
}
