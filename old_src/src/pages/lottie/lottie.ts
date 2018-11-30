import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LottiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lottie',
  templateUrl: 'lottie.html',
})
export class LottiePage {
    public lottieConfig: Object;
    private anim: any;
    private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      autoplay: true,
      loop: true
  };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LottiePage');
  }

}
