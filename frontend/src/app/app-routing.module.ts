import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetComponent } from './create-set/create-set.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSetComponent } from './edit-set/edit-set.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { RandomFlashCardComponent } from './random-flash-card/random-flash-card.component';
import { SeeFlashCardComponent } from './see-flash-card/see-flash-card.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SetsComponent } from './sets/sets.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewSetComponent } from './view-set/view-set.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'log-in', component: LogInComponent},
  {path: 'random', component: RandomFlashCardComponent, canActivate: [AuthGuardService]},
  {path: 'sets/learn/:id', component: SeeFlashCardComponent, canActivate: [AuthGuardService]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sets/learn/:id', component: SeeFlashCardComponent, canActivate: [AuthGuardService]},
  {path: 'sets', component: SetsComponent, canActivate: [AuthGuardService]},
  {path: 'sets/createset', component: CreateSetComponent, canActivate: [AuthGuardService]},
  {path: 'sets/viewset/:id', component: ViewSetComponent, canActivate: [AuthGuardService]},
  {path: 'sets/editset/:id', component: EditSetComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
