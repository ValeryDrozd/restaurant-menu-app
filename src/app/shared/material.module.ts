import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class MaterialModule {}
