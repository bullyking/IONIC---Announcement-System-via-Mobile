import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, PopoverController, ActionSheetController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddNewsPage } from '../addnews/addnews';
import { AdminEditPage } from '../adminedit/adminedit';
import { UserViewsPage } from '../userviews/userviews';
import moment from 'moment';

@Component({
  selector: 'page-adminnews',
  templateUrl: 'adminnews.html'
})
export class AdminNewsPage {

  news: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public angFire: AngularFireDatabase, private alertCtrl: AlertController, public popCtrl: PopoverController,
    public actionSheet: ActionSheetController, public zone: NgZone, public modalCtrl: ModalController) {
    this.news = angFire.list('news/', {
      query: {
        orderByChild: 'negativtimestamp'
      }
    });
  }

  ionViewDidLoad() {

  }

  addNew() {
    let modal = this.modalCtrl.create(AddNewsPage);
    modal.present();
  }

  AdminViews(news) {
    let profileModal = this.modalCtrl.create(UserViewsPage, { 'value': news });
    profileModal.present();
  }

  Edit(news) {
    let profileModal = this.modalCtrl.create(AdminEditPage, { 'value': news });
    profileModal.present();
  }

  editNews(news) {
    let prompt = this.alertCtrl.create({
      title: 'แก้ไขข่าวสาร',
      message: 'แก้ไข หัวข้อเรื่อง และ รายละเอียด',
      inputs: [
        {
          name: 'title',
          placeholder: news.title,
          value: news.title
        },
        {
          name: 'detail',
          placeholder: news.detail,
          value: news.detail
        }
      ],
      buttons: [
        {
          text: "ยกเลิก",
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: "บันทึก",
          handler: data => {
            let newsTitle = data.title;
            let newsDetail = data.detail;
            let newsDate = moment().format('DD/MM/YYYY');
            let newsTime = moment().format('hh:mm a');
            let newsDateFix = moment().format('DD');

            this.news.update(news.$key, {
              title: newsTitle,
              detail: newsDetail,
              date: newsDate,
              time: newsTime,
              datefix: newsDateFix
            })
          }
        }
      ]
    })
    prompt.present();
  }

  deleteNews(newsID): void {
    let prompt = this.alertCtrl.create({
      title: 'ยืนยันการลบข่าวสาร?',
      buttons: [
        {
          text: "ยกเลิก",
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: "ยืนยัน",
          handler: data => {
            this.news.remove(newsID);
          }
        }
      ]
    });
    prompt.present();
  }

}
