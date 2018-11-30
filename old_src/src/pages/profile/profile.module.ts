import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class ProfilePageModule {}
