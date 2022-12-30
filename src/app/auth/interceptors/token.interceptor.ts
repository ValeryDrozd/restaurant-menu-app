import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authService = this.injector.get(AuthService);
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }
    return next.handle(request);
  }
}
