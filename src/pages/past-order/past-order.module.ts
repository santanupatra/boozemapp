import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastOrderPage } from './past-order';

@NgModule({
  declarations: [
    PastOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PastOrderPage),
  ],
})
export class PastOrderPageModule {}
