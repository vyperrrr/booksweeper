import {Component} from '@angular/core';
import {AuthenticationRequest} from "../api/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../api/services/authentication.service";
import {TokenService} from "../services/token/token.service";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {

  authenticationRequest: AuthenticationRequest = {email: '', password: ''};
  errors: string[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  authenticate() {
    this.errors = [];
    this.authenticationService
      .authenticate({
        body: this.authenticationRequest
      })
      .subscribe({
        next: (response) => {
          // Save token
          this.tokenService.token = response.token as string;
          this.router.navigate(['explore']);
        },
        error: (error) => {
          if(error.error.validationErrors)
            this.errors = error.error.validationErrors;
          else
            this.errors.push(error.error.error)
        }
      })
  }

  register() {
    this.router.navigate(['register']);
  }

}

