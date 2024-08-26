import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { ExploreComponent } from './explore/explore.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import {NgOtpInputModule} from "ng-otp-input";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    RegisterComponent,
    ExploreComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    NgOtpInputModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
