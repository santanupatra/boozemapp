import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CocktailCostingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocktail-costing',
  templateUrl: 'cocktail-costing.html',
})
export class CocktailCostingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocktailCostingPage');
  }

  cocktailCosting2(){
    this.navCtrl.push("CocktailCosting2Page");
  }
}
