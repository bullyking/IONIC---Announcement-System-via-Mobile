import { Component } from '@angular/core';
import { NavController, ModalController, Platform  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserViewsPage } from '../userviews/userviews';
import { Storage } from '@ionic/storage';
import moment from 'moment';

@Component({
  selector: 'page-usernotification',
  templateUrl: 'usernotification.html'
})
export class UserNotificationPage {

  news: FirebaseListObservable<any>;

  //date notification
  today: any;
  yesterday: any;
  afteryesterday: any;
  makeday: any;

  showtoday: any;
  showyesterday: any;

  public state_color: string;

  constructor(public navCtrl: NavController, public angFire: AngularFireDatabase,
    public modalCtrl: ModalController, public storage: Storage, public platform: Platform) {

    this.news = angFire.list('/news', {
      query: {
        orderByChild: 'negativtimestamp'
      }
    });
  }

  ionViewDidLoad() {

  }

  UserModal(news) {
    //Modal
    let profileModal = this.modalCtrl.create(UserViewsPage, { 'value': news });
    profileModal.present();
  }

  ngOnInit() {
    this.today = moment().format('DD/MM/YYYY');
    this.yesterday = moment().add(-1, 'day').format('DD/MM/YYYY');

    var showtoday = 'วันนี้';
    var showyesterday = 'เมื่อวาน';

    this.showtoday = showtoday;
    this.showyesterday = showyesterday;
  }

}
