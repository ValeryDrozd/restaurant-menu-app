import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { debounce, interval, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/menu/services/data.service';
import Dish from 'src/app/shared/interfaces/dish.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatToolbar, { read: ElementRef })
  toolbarRef!: ElementRef<HTMLDivElement>;

  searchingDishControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Subject<Dish[]> = new Subject();

  constructor(
    private dataService: DataService,
    public authService: AuthService,
    public router: Router
  ) {}

  public shouldSidenavShow() {
    return this.toolbarRef.nativeElement.offsetWidth <= 800;
  }

  public open() {
    if (this.shouldSidenavShow()) {
      this.sidenav.open();
    }
  }

  public ngOnInit() {
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

  public displayDish(dish: Dish) {
    return dish.name;
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const dish: Dish = event.option.value;
    this.router.navigate(['/menu'], {
      queryParams: {
        category: dish.categoryId,
      },
      fragment: dish.id.toString(),
    });

    this.searchingDishControl.setValue('');
    this.sidenav.close();
  }

  public onLoginButtonClick() {
    if (this.authService.getAccessToken()) {
      this.authService.logout();
      window.location.reload();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
