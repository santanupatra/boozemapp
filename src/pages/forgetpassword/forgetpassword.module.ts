import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetpasswordPage } from './forgetpassword';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    ForgetpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetpasswordPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class ForgetpasswordPageModule {}
