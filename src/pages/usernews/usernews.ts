import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserViewsPage } from '../userviews/userviews';

@Component({
  selector: 'page-usernews',
  templateUrl: 'usernews.html'
})
export class UserNewsPage {

  news: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFire: AngularFireDatabase,
    public modalCtrl: ModalController) {
    this.news = angFire.list('/news', {
      query: {
        orderByChild: 'negativtimestamp'
      }
    });
  }

  ionViewDidLoad() {
  }

  UsersView(news) {
    let modal = this.modalCtrl.create(UserViewsPage, { 'value': news });
    modal.present();
  }

}
