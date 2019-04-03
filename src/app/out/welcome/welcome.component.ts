import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../authentication/authentication.service';
import { tabletsWidth, handHeldsWidth } from '../../shared/globals';
import { environment } from '../../../environments/environment';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  version: string;
  signupForm: FormGroup;
  loginForm: FormGroup;
  isSignInView = true;
  isTabletSize: Observable<boolean>;
  isPhoneSize: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    private uiService: UIService
  ) {
    this.version = 'r';
    // this.version = environment.version;
  }

  ngOnInit() {
    this.uiService.toggleTabletScreenSize(window.innerWidth <= tabletsWidth);
    this.uiService.togglePhoneScreenSize(window.innerWidth <= handHeldsWidth);
    this.isTabletSize = this.uiService.isTabletSize$();
    this.isPhoneSize = this.uiService.isPhoneSize$();

    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'termsAndConditions': new FormControl(false, [Validators.pattern('true')])
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  switchLogin(b: boolean) {
    this.isSignInView = b;
  }

  onSubmitForm() {
    if (this.isSignInView) {
      if (this.loginForm.valid) {
        this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      }
    } else {
      if (this.signupForm.valid) {
        this.auth.signUp(this.signupForm.get('email').value, this.signupForm.get('password').value);
      }
    }
  }

  onResize(_event) {
    this.uiService.toggleTabletScreenSize(window.innerWidth <= tabletsWidth);
    this.uiService.togglePhoneScreenSize(window.innerWidth <= handHeldsWidth);
  }

}
