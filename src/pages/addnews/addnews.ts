import { Component, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { NewsService } from '../../app/services/news.service';

@Component({
  selector: 'page-addnews',
  templateUrl: 'addnews.html',
  providers: [NewsService]
})
export class AddNewsPage {

  postData: any;

  news: FirebaseListObservable<any>;

  title = '';
  detail = '';
  moredetail = '';

  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    private camera: Camera, public angFire: AngularFireDatabase,
    public zone: NgZone, public alertCtrl: AlertController,
    public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private newsService: NewsService,
    public http: Http, public storage: Storage) {

    this.news = angFire.list('/news', {
      query: {
        orderByChild: 'negativtimestamp'
      }

    });
  }

  ionViewDidLoad() {

  }

  closeEdit() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.photos = [];
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {

    });
  }

  Gallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {

    });
  }

  confirmAddNews(news) {
    let date = moment().format('DD/MM/YYYY');
    let time = moment().format('hh:mm a');
    let datefix = moment().format('DD');
    let base64Image = this.base64Image;

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
            if (base64Image) {
              base64Image = base64Image;
            } else {
              base64Image = "";
            }

            this.news.push({
              title: this.title,
              detail: this.detail,
              moredetail: this.moredetail,
              image: base64Image,
              state_color: 'danger',
              state_checkmark: 'alert',
              date: date,
              time: time,
              datefix: datefix,
              timestamp: Date.now(),
              negativtimestamp: -Date.now(),
            }).then((data) => {
              if (this.postData) {
                return Promise.resolve(this.postData);
              }

              return new Promise(resolve => {

                let title = {};
                let myHeader = new Headers({
                  "content-Type": "application/x-www-form-urlencoded, application/json",
                });
                let options = new RequestOptions({
                  headers: myHeader
                });

                this.http.post('http://localhost/ionic2/sendNotification.php', "title=" + title, options)
                  .map(res => res.json())
                  .subscribe(data => {
                    this.postData = data;
                    resolve(this.postData);
                  });
              });
            });
            this.viewCtrl.dismiss();
          }
        }
      ]
    })
    prompt.present();
  }

}
