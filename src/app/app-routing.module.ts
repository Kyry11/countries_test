import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryInfoComponent } from './country-info/country-info.component';

const routes: Routes = [
  { path: 'country/:iso', component: CountryInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
