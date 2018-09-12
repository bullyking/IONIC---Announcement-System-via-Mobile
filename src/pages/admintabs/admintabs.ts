import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AdminNewsPage } from '../adminnews/adminnews'
import { AdminSettingsPage } from '../adminsettings/adminsettings'

@Component({
  selector: 'page-admintabs',
  templateUrl: 'admintabs.html'
})
export class AdminTabsPage {

  tab1Root: any = AdminNewsPage;
  tab2Root: any = AdminSettingsPage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

}
