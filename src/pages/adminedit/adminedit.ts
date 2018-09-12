import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import moment from 'moment';

@Component({
  selector: 'page-adminedit',
  templateUrl: 'adminedit.html'
})
export class AdminEditPage {

  news: FirebaseListObservable<any>;

  NewsData: any;

  public photos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public angFire: AngularFireDatabase, public alertCtrl: AlertController,
  ) {
    this.NewsData = this.navParams.get('value');
    this.news = angFire.list('/news', {
      query: {
        orderByChild: 'negativtimestamp'
      }

    });
  }

  closeEdit() {
    this.viewCtrl.dismiss();
  }

  EditNews(NewsData): void {
    let date = moment().format('DD/MM/YYYY');
    let time = moment().format('hh:mm a');
    let datefix = moment().format('DD');

    let prompt = this.alertCtrl.create({
      title: 'ยืนยันการเพิ่มข่าวสารหรือไม่?',
      buttons: [{
        text: "ยกเลิก",
        handler: data => {

        }
      },
        {
          text: "ยืนยัน",
          handler: data => {
            let newsTitle = NewsData.title;
            let newsDetail = NewsData.detail;
            let newsMoreDetail = NewsData.moredetail;
            let newsImage = NewsData.image;

            this.news.update(NewsData.$key, {
              title: newsTitle,
              detail: newsDetail,
              moredetail: newsMoreDetail,
              image: newsImage,
              date: date,
              time: time,
              datefix: datefix,
              timestamp: Date.now(),
              negativtimestamp: -Date.now(),
            }).then((data) => {
              this.viewCtrl.dismiss();
            });
           }
        }
      ]
    })
    prompt.present();
  }

}
