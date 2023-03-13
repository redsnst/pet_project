import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLoggedIn: boolean;
  public userId: string = '';

  public constructor(private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
        this.userId = user.uid;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  public loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        return { isValid: false, message: error.message };
      });
  }

  public signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result?.user?.sendEmailVerification();
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        return { isValid: false, message: error.message };
      });
  }
}
