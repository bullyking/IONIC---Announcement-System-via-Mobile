import { Component } from '@angular/core';
import { NavController, LoadingController, App, AlertController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-admineditaccount',
  templateUrl: 'admineditaccount.html',
  providers: [NewsService]
})
export class AdminEditAccountPage {

  constructor(public navCtrl: NavController, private newsService: NewsService, private loadCtrl: LoadingController,
    private app: App, private alertCtrl: AlertController, public storage: Storage) { }

  ionViewDidLoad() {
  }

  logUserout() {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการออกจากระบบ?',

      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {

          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.storage.remove('email');
            this.storage.remove('password');
            this.newsService.logoutUser().then(() => {
              this.app.getRootNav().setRoot(LoginPage);
            })
          }
        },
      ]
    });
    confirm.present();
  }
}
