import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchingDishControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  //filteredOptions: Observable<string[]> = new Observable();

  // ngOnInit() {
  // this.filteredOptions = this.searchingDishControl.valueChanges.pipe(
  //   startWith(''),
  //   map((value) => this._filter(value || ''))
  // );
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
