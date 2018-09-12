import { Injectable, NgZone } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class NewsService {

  //Auth
  public fireAuth: any;
  public userProfile: any;

  constructor(public zone: NgZone, public platform: Platform, public alertCtrl: AlertController,
  public http: Http) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');

    platform.ready().then(() => {
      
    });
  }

  signUpUser(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        //sign in the user
        this.fireAuth.signInWithEmailAndPassword(email, password)
          .then((authenticatedUser) => {
            //successful login, create user profile
            this.userProfile.child(authenticatedUser.uid).set({
              email: email,
            });
          });
      });
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.fireAuth.signOut();
  }

  forgotPasswordUser(email: any) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
