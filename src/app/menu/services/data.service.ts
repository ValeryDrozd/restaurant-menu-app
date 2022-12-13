import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Category from 'src/app/shared/interfaces/category.interface';
import Dish from 'src/app/shared/interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}
  private readonly baseUrl = 'http://localhost:3000';

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/categories`);
  }

  public getDishesByCategory(categoryId: number): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${this.baseUrl}/dishes`, {
      params: {
        categoryId,
      },
    });
  }
}
