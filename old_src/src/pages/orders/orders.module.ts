import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class OrdersPageModule {}
