import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogOutComponent } from './log-out/log-out.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { RandomFlashCardComponent } from './random-flash-card/random-flash-card.component';
import { SeeFlashCardComponent } from './see-flash-card/see-flash-card.component';
import { EditSetComponent } from './edit-set/edit-set.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FlashCardListElComponent } from './flash-card-list-el/flash-card-list-el.component';
import { CreateSetComponent } from './create-set/create-set.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogOutComponent,
    DashboardComponent,
    HomeComponent,
    LogInComponent,
    FlashCardComponent,
    RandomFlashCardComponent,
    SeeFlashCardComponent,
    EditSetComponent,
    SignUpComponent,
    FlashCardListElComponent,
    CreateSetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
