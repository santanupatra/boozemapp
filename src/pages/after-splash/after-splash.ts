import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the AfterSplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-splash',
  templateUrl: 'after-splash.html',
})
export class AfterSplashPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    events.publish('hideFooter', { isHidden: true});
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterSplashPage');
  }

  onLogin() {
		this.navCtrl.push('SigninPage');
	}
  onSignup(){
    this.navCtrl.push('SignupPage');
  }
  

}
