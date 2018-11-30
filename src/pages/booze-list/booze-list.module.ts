import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoozeListPage } from './booze-list';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    BoozeListPage,
  ],
  imports: [
    IonicPageModule.forChild(BoozeListPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class BoozeListPageModule {}
