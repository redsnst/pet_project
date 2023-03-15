import { Component,  } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';
import { GoogleAuthService } from '../shared/google-auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent {

  public loginForm: FormGroup;
  public firebaseErrorMessage: string;

  public constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth, public googleAuthService: GoogleAuthService) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  public loginUser() {
      if (this.loginForm.invalid)
          return;

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result: { isValid: boolean; message: string; } | null) => {
          if (result == null) {
              console.log('logging in...');
              this.router.navigate(['/schedule']);
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
          }
      });
  }

}
