import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    email: '',
    password: ''
  }

  errors: string[] = [];

}
