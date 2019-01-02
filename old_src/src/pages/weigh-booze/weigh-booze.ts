import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WeighBoozePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weigh-booze',
  templateUrl: 'weigh-booze.html',
})
export class WeighBoozePage {
  public lottieConfig: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    }; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeighBoozePage');
  }

}
