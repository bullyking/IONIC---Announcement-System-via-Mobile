import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ViewController, Platform } from 'ionic-angular';
import { AdminTabsPage } from '../admintabs/admintabs';
import { UserTabsPage } from '../usertabs/usertabs';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NewsService } from '../../app/services/news.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [NewsService],
})
export class LoginPage {

  //Auth
  public email: any;
  public password: any;

  hideorshow = "show";
  type = "password";

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private newsService: NewsService,
    public loadCtrl: LoadingController, public viewCtrl: ViewController, public platform: Platform,
    public http: Http, public storage: Storage) {

  }

  ionViewDidLoad() {

  }

  toggleShow() {
    var state = this.type; //สถานะเริ่มต้น คือ password

    if (state === "password") {
      this.type = 'text';
      this.hideorshow = "hide";
    }
    else {
      this.type = "password";
      this.hideorshow = "show";
    }
  }

  Admin() {
    this.navCtrl.push(AdminTabsPage);
  }

  User() {
    this.navCtrl.push(UserTabsPage);
  }

  submitLogin() {
    var email = this.email;
    var password = this.password;
    this.newsService.loginUser(email, password).then(authData => {
      if ((email === 'kitja.rodrat@gmail.com') || (email === 'minidmate@gmail.com')) {
        this.storage.set('email', email);
        this.storage.set('password', password);
        this.navCtrl.push(AdminTabsPage);
      } else {
        this.storage.set('email', email);
        this.storage.set('password', password);
        this.navCtrl.push(UserTabsPage);
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'ข้อมูลไม่ถูกต้อง!',
        subTitle: 'อีเมลล์หรือรหัสผ่านไม่ถูกต้อง โปรดกรอกใหม่อีกครั้ง!',
        buttons: ['ตกลง']
      });
      alert.present();
    });
  }

  register() {
    let prompt = this.alertCtrl.create({
      title: 'โปรดกรอกรายละเอียด เพื่อสมัครเข้าใช้งาน',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'อีเมลล์ (Email)',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'รหัสผ่าน (Password)',
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
          }
        },
        {
          text: 'บันทึก',
          handler: data => {
            this.newsService.signUpUser(data.email, data.password).then(authData => {
              if ((data.email === 'kitja.rodrat@gmail.com') || (data.email === 'minidmate@gmail.com')) {
                this.storage.set('email', data.email);
                this.storage.set('password', data.password);
              } else {
                this.storage.set('email', data.email);
                this.storage.set('password', data.password);
                this.navCtrl.push(UserTabsPage);
              }
              let alert = this.alertCtrl.create({
                title: 'สมัครเข้าใช้งานเสร็จสมบูรณ์',
                buttons: ['ตกลง']
              });
              alert.present();
            }, error => {
              let alert = this.alertCtrl.create({
                title: 'อีเมลล์ไม่ถูกต้อง',
                subTitle: 'อีเมลล์ไม่ถูกต้อง หรือถูกใช้งานแล้ว โปรดกรอกอีเมลล์อื่น!',
                buttons: ['ตกลง']
              });
              alert.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  resetpass() {
    let prompt = this.alertCtrl.create({
      title: 'โปรดกรอกอีเมลล์ที่ใช้สมัคร',
      message: "รหัสผ่านใหม่จะถูกส่งไปที่อีเมลล์ของคุณ",
      inputs: [
        {
          name: 'recoverEmail',
          type: 'email',
          placeholder: 'อีเมลล์ (Email)',
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {

          }
        },
        {
          text: 'ตกลง',
          handler: data => {

            let loader = this.loadCtrl.create({
              content: "รอซักครู่...",
              duration: 3000
            });
            loader.present();

            this.newsService.forgotPasswordUser(data.recoverEmail).then(() => {

              loader.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                  title: 'ตรวจสอบอีเมลล์ของคุณ',
                  subTitle: 'รีเซ็ตรหัสผ่านเรียบร้อย',
                  buttons: ['ตกลง']
                });
                alert.present();
              });
            }, error => {
              let alert = this.alertCtrl.create({
                title: 'รีเซ็ตรหัสผ่านผิดพลาด',
                subTitle: error.message,
                buttons: ['ตกลง']
              });
              alert.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
