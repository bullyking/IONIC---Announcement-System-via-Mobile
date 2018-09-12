import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { UserNewsPage } from '../usernews/usernews'
import { UserNotificationPage } from '../usernotification/usernotification'
import { UserSettingsPage } from '../usersettings/usersettings';

@Component({
  selector: 'page-usertabs',
  templateUrl: 'usertabs.html'
})
export class UserTabsPage {

  tab1Root: any = UserNewsPage;
  tab2Root: any = UserNotificationPage;
  tab3Root: any = UserSettingsPage;

  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ionViewDidLoad() {

  }

}
