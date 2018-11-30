import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourCocktailPage } from './your-cocktail';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    YourCocktailPage,
  ],
  imports: [
    IonicPageModule.forChild(YourCocktailPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class YourCocktailPageModule {}
