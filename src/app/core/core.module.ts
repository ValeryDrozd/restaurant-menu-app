import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
