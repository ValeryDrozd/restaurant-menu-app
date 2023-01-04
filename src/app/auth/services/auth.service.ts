import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import User, { Credentials } from '../interfaces/user.interface';
import { StorageService } from './storage.service';

const TOKEN_KEY = 'TOKEN';

interface ApiUser {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';
  public admin = false;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
    if (this.storageService.getAccessToken()) {
      this.getCurrentUser().subscribe((user) => {
        this.admin = user.admin;
      });
    }
  }

  private updateCurrentUserData(apiUser: ApiUser) {
    this.storageService.setAccessToken(apiUser.accessToken);
    this.admin = apiUser.user.admin;
  }

  public registerUser({
    email,
    password,
    name,
  }: Credentials): Observable<User> {
    return this.httpClient
      .post<ApiUser>(`${this.baseUrl}/register`, {
        email,
        password,
        name,
        admin: false,
      })
      .pipe(
        tap((user) => this.updateCurrentUserData(user)),
        map((res) => res.user)
      );
  }

  public loginUser({ email, password }: Credentials): Observable<User> {
    return this.httpClient
      .post<ApiUser>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => this.updateCurrentUserData(user)),
        map((res) => res.user)
      );
  }

  private getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/profile`);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.admin = false;
  }
}
