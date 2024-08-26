import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticateComponent} from "./authenticate/authenticate.component";
import {RegisterComponent} from "./register/register.component";
import {ExploreComponent} from "./explore/explore.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";

const routes: Routes = [
  {
    path: 'authenticate',
    component: AuthenticateComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
