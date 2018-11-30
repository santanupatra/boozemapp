import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocktailExpandPage } from './cocktail-expand';

@NgModule({
  declarations: [
    CocktailExpandPage,
  ],
  imports: [
    IonicPageModule.forChild(CocktailExpandPage),
  ],
})
export class CocktailExpandPageModule {}
