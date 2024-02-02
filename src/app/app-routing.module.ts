import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping', component: BasketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
