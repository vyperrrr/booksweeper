import {Component} from '@angular/core';
import {RegistrationRequest} from "../api/models/registration-request";
import {authenticate} from "../api/fn/authentication/authenticate";
import {Router} from "@angular/router";
import {AuthenticationService} from "../api/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationRequest: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  errors: string[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  register() {
    this.errors = [];
    this.authenticationService
      .register({
        body: this.registrationRequest,
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['activate-account']);
        },
        error: (error) => {
          if(error.error.validationErrors)
            this.errors = error.error.validationErrors;
        }
      })
  }

  authenticate() {
    this.router.navigate(['/login']);
  }
}
