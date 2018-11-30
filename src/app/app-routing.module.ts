import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FiveDayForecastComponent } from './five-day-forecast/five-day-forecast.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'fiveDayForecast', component: FiveDayForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
