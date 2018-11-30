import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottiePage } from './lottie';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    LottiePage,
  ],
  imports: [
    IonicPageModule.forChild(LottiePage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class LottiePageModule {}
