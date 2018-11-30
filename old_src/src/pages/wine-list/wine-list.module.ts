import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WineListPage } from './wine-list';
import { LottieAnimationViewModule } from 'ng-lottie';


@NgModule({
  declarations: [
    WineListPage,
  ],
  imports: [
    IonicPageModule.forChild(WineListPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class WineListPageModule {}
