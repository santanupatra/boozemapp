import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailRecipePage } from './cocktail-recipe';

@NgModule({
  declarations: [
    CocktailRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailRecipePage),
  ],
})
export class CocktailRecipePageModule {}
