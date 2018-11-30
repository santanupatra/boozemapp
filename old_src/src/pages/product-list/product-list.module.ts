import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class ProductListPageModule {}
