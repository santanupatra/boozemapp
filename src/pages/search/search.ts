import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  serchkey : any;
  show : any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  getItems(ev){
  	this.show = 1;
  	if(!this.serchkey){
  		this.show = !this.show;
  	}
  	console.log(this.serchkey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
