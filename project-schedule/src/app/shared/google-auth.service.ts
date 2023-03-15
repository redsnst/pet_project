import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public constructor (
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}
  public googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }
  public authLogin(provider: GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this.router.navigate(['/schedule']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
