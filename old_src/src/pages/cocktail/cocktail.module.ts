import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailPage } from './cocktail';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    CocktailPage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailPage),
    LottieAnimationViewModule.forRoot()
  ],
})
export class CocktailPageModule {}
