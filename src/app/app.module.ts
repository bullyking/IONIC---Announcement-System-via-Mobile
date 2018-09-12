import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera'
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase/app';

var config = {
  Your Firebase Connection
}
firebase.initializeApp(config);

import { AddNewsPage } from '../pages/addnews/addnews';

import { AdminTabsPage } from '../pages/admintabs/admintabs';
import { AdminNewsPage } from '../pages/adminnews/adminnews';
import { AdminSettingsPage } from '../pages/adminsettings/adminsettings';
import { AdminEditPage } from '../pages/adminedit/adminedit';
import { AdminEditAccountPage } from '../pages/admineditaccount/admineditaccount';

import { UserTabsPage } from '../pages/usertabs/usertabs';
import { UserNewsPage } from '../pages/usernews/usernews';
import { UserNotificationPage } from '../pages/usernotification/usernotification';
import { UserViewsPage } from '../pages/userviews/userviews';
import { UserSettingsPage } from '../pages/usersettings/usersettings';
import { UserEditAccountPage } from '../pages/usereditaccount/usereditaccount';

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    AdminTabsPage,
    AdminSettingsPage,

    AddNewsPage,

    AdminNewsPage,
    AdminSettingsPage,
    AdminEditPage,
    AdminEditAccountPage,

    UserTabsPage,
    UserNewsPage,
    UserNotificationPage,
    UserViewsPage,
    UserSettingsPage,
    UserEditAccountPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    UserEditAccountPage,
    AdminTabsPage,
    AdminSettingsPage,

    AddNewsPage,

    AdminNewsPage,
    AdminSettingsPage,
    AdminEditPage,
    AdminEditAccountPage,

    UserTabsPage,
    UserNewsPage,
    UserNotificationPage,
    UserViewsPage,
    UserSettingsPage,
    UserEditAccountPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
