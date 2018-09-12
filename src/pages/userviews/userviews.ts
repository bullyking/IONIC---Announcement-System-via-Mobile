import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-userviews',
  templateUrl: 'userviews.html',
})
export class UserViewsPage {

  NewsData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  ) {
    this.NewsData = this.navParams.get('value')
  }

  ionViewDidLoad() {

  }

  closeEdit() {
    this.viewCtrl.dismiss();
  }

}
