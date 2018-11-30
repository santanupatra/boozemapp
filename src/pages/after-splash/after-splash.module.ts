import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterSplashPage } from './after-splash';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    AfterSplashPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterSplashPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class AfterSplashPageModule {}
