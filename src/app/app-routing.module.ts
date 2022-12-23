import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuModule } from './menu/menu.module';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MenuModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
