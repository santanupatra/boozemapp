import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoriesawaitsprofilePage } from './memoriesawaitsprofile';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    MemoriesawaitsprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MemoriesawaitsprofilePage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class MemoriesawaitsprofilePageModule {}
