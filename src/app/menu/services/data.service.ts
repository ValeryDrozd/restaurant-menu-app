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

  public getDishesByName(name: string): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${this.baseUrl}/dishes`, {
      params: {
        name_like: name,
      },
    });
  }

  public addNewDish(dish: Dish): Observable<Dish> {
    return this.httpClient.post<Dish>(`${this.baseUrl}/dishes`, {
      ...dish,
      id: new Date().valueOf(),
    });
  }
  public addNewCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseUrl}/categories`, {
      ...category,
      id: new Date().valueOf(),
    });
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.httpClient.patch<Category>(
      `${this.baseUrl}/categories/${category.id}`,
      category
    );
  }

  public updateDish(dish: Dish): Observable<Dish> {
    return this.httpClient.patch<Dish>(
      `${this.baseUrl}/dishes/${dish.id}`,
      dish
    );
  }

  public deleteCategory(categoryId: number): Observable<Category> {
    return this.httpClient.delete<Category>(
      `${this.baseUrl}/categories/${categoryId}`
    );
  }

  public deleteDish(dishId: number): Observable<Dish> {
    return this.httpClient.delete<Dish>(`${this.baseUrl}/dishes/${dishId}`);
  }
}
