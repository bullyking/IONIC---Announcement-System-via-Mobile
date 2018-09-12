import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserEditAccountPage } from '../usereditaccount/usereditaccount';

@Component({
  selector: 'page-usersettings',
  templateUrl: 'usersettings.html'
})
export class UserSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersettingsPage');
  }

  account() {
    this.navCtrl.push(UserEditAccountPage)
  }

}
