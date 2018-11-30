import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailTotalPricePage } from './cocktail-total-price';

@NgModule({
  declarations: [
    CocktailTotalPricePage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailTotalPricePage),
  ],
})
export class CocktailTotalPricePageModule {}
