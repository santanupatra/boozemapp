import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeighBoozePage } from './weigh-booze';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    WeighBoozePage,
  ],
  imports: [
    IonicPageModule.forChild(WeighBoozePage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class WeighBoozePageModule {}
