import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeeddetailsPage } from './feeddetails';

@NgModule({
  declarations: [
    FeeddetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeeddetailsPage),
  ],
})
export class FeeddetailsPageModule {}
