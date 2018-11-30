import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoriesawaitsPage } from './memoriesawaits';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    MemoriesawaitsPage,
  ],
  imports: [
    IonicPageModule.forChild(MemoriesawaitsPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class MemoriesawaitsPageModule {}
