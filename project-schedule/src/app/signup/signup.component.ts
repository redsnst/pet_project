import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  public firebaseErrorMessage: string;

  public constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth) {
      this.firebaseErrorMessage = '';
  }

  public ngOnInit(): void {
      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
  }

  public signup() {
      if (this.signupForm.invalid) {
        return;
      } 

      this.authService.signupUser(this.signupForm.value).then((result) => {
          if (result == null)
              this.router.navigate(['/schedule']);
          else if (result.isValid == false)
              this.firebaseErrorMessage = result.message;
      }).catch(() => {

      });
  }
}
