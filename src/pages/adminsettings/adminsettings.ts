import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AdminEditAccountPage } from '../admineditaccount/admineditaccount';

@Component({
  selector: 'page-adminsettings',
  templateUrl: 'adminsettings.html'
})
export class AdminSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }

  account() {
    this.navCtrl.push(AdminEditAccountPage)
  }

}
