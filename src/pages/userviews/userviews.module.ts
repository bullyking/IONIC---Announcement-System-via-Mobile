import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewsPage } from './userviews';

@NgModule({
  declarations: [
    UserViewsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewsPage),
  ],
  exports: [
    UserViewsPage
  ]
})
export class UserviewsModule {}
