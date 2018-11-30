import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrivingOrderPage } from './arriving-order';

@NgModule({
  declarations: [
    ArrivingOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ArrivingOrderPage),
  ],
})
export class ArrivingOrderPageModule {}
