import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../api/services/authentication.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  message = '';
  code = '';
  isCorrect = false;
  submitted = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  redirectToLogin() {
    this.router.navigate(['/authenticate']);
  }

  validateCode() {
    this.authenticationService
      .confirm({
        code: this.code
      })
      .subscribe(
        {
          next: () => {
            this.submitted = true;
            this.isCorrect = true;
            this.message = 'Your account has been activated successfully';
          },
          error: () => {
            this.submitted = true;
            this.isCorrect = false;
            this.message = 'Invalid code';
          }
        }
      )
  }

}
