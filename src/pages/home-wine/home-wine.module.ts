import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeWinePage } from './home-wine';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [
    HomeWinePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeWinePage),
    LongPressModule,
  ],
})
export class HomeWinePageModule {}
