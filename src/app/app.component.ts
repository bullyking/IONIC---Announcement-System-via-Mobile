import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { NewsService } from './services/news.service';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AdminTabsPage } from '../pages/admintabs/admintabs';
import { UserTabsPage } from '../pages/usertabs/usertabs';

@Component({
  templateUrl: 'app.html',
  providers: [NewsService]
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public alertCtrl: AlertController, public http: Http, public storage: Storage,
    public newsService: NewsService) {

    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.StatusLogin();
    });
  }

  ionViewDidLoad() {

  }

  StatusLogin() {
    var Email = this.storage.get('email');
    var Password = this.storage.get('password');
    Promise.all([Email, Password]).then((Auth) => {
      var email = Auth[0];

      if ((email === 'kitja.rodrat@gmail.com') || (email === 'minidmate@gmail.com')) {
        this.rootPage = AdminTabsPage;
      } else if ((email === null) || (email === null)) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = UserTabsPage;
      }
    });

  }
}
