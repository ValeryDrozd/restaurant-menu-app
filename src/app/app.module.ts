import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { MaterialModule } from './shared/material.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HomePageComponent, ContactPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    MenuModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
