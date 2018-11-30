import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeWinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-wine',
  templateUrl: 'home-wine.html',
})
export class HomeWinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeWinePage');
  }

  className: any='wine-holder';
  pressed() {
    // this.navCtrl.push('ForgetpasswordPage');
    
    this.className = 'wine-holder-shake';
    
  }
  released(){
    this.className = 'wine-holder';
  }
  active() {

  }

}
