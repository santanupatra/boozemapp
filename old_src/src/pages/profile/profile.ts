import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  rForm: FormGroup;
  responseData: any;
  error: string;
  user_id: any;
  user_details: any;
  busy: boolean;
  isValidEmail = true;
  passwordmatch =true;
  checkEmailExist =true;
  public lottieConfig: Object;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public events: Events,
    public storage: Storage,
    private fb: FormBuilder
  ) {
      this.user_details =  JSON.parse(localStorage.getItem('userData'));
      this.user_id = this.user_details.id;

      this.lottieConfig = {
        path: 'assets/animation-w512-h512.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
  }

  public myProfile(){
    this.navCtrl.push('MyprofilePage');
  }

  public changePassword(){
    this.navCtrl.push('ChangePasswordPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
