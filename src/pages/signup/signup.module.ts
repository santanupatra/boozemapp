import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class SignupPageModule {}
