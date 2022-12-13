import { Component, Input } from '@angular/core';
import Dish from 'src/app/shared/interfaces/dish.interface';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() dish!: Dish;
}
