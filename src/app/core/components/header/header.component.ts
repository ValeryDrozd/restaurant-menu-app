import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { debounce, interval, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StorageService } from 'src/app/auth/services/storage.service';
import { DataService } from 'src/app/menu/services/data.service';
import Dish from 'src/app/shared/interfaces/dish.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatToolbar, { read: ElementRef })
  toolbarRef!: ElementRef<HTMLDivElement>;
  searchInputSubscribtion!: Subscription;

  searchingDishControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Subject<Dish[]> = new Subject();

  constructor(
    private dataService: DataService,
    public storageService: StorageService,
    private authService: AuthService,
    public router: Router
  ) {}

  public shouldSidenavShow() {
    return this.toolbarRef.nativeElement.offsetWidth <= 885;
  }

  public open() {
    if (this.shouldSidenavShow()) {
      this.sidenav.open();
    }
  }

  public ngOnInit() {
    this.searchInputSubscribtion = this.searchingDishControl.valueChanges
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

  ngOnDestroy(): void {
    this.searchInputSubscribtion.unsubscribe();
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
    if (this.storageService.getAccessToken()) {
      this.authService.logout();
      window.location.reload();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
