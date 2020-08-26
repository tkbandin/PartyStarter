import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  // imports: [BrowserModule, RouterModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
