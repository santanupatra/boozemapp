import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { LongPressModule } from 'ionic-long-press';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    LottieAnimationViewModule.forRoot(),
    LongPressModule
  ],
})
export class HomePageModule {}
