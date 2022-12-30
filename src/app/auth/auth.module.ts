import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
