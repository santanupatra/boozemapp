import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class ChangePasswordPageModule {}
