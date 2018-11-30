import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailCostingPricePage } from './cocktail-costing-price';

@NgModule({
  declarations: [
    CocktailCostingPricePage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailCostingPricePage),
  ],
})
export class CocktailCostingPricePageModule {}
