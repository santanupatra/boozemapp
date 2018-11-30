import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CocktailCosting2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocktail-costing2',
  templateUrl: 'cocktail-costing2.html',
})
export class CocktailCosting2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocktailCosting2Page');
  }

  cocktailTotalPrice(){
    this.navCtrl.push("CocktailTotalPricePage");
  }

}
