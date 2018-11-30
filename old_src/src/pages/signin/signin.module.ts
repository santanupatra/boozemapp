import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class SigninPageModule {}
