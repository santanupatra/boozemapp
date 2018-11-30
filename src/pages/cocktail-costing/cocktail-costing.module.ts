import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailCostingPage } from './cocktail-costing';

@NgModule({
  declarations: [
    CocktailCostingPage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailCostingPage),
  ],
})
export class CocktailCostingPageModule {}
