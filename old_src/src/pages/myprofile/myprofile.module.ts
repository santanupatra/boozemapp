import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyprofilePage } from './myprofile';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    MyprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyprofilePage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class MyprofilePageModule {}
