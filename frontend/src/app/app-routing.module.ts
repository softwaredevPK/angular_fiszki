import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { RandomFlashCardComponent } from './random-flash-card/random-flash-card.component';
import { SeeFlashCardComponent } from './see-flash-card/see-flash-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'random', component: RandomFlashCardComponent},
  {path: 'sets/learn/:id', component: SeeFlashCardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
