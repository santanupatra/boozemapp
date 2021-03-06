import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public loguser:any;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;
  


  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  isValidEmail = true;
  users: any;
  userData:any;
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  constructor(

    private builder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,    
    private myApp:MyApp,
    public events: Events
    
    
  ) {    
    //events.publish('hideMenu', { isHidden: true});
      this.menu.enable(false, 'leftMenu');
      this.form = builder.group({
        'username': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
      });
      //events.publish('hideFooter', { isHidden: true});

      this.lottieConfig = {
        path: 'assets/animation-w512-h512.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      }; 
  }

  

  loginUser(formData) {    
      this.authService.login(formData).subscribe(res => {
      if(res.ack==1){      
        this.storage.ready().then(() => {
          this.userData=localStorage.setItem('userData', JSON.stringify(res.details));        
          this.storage.set('username', res.details['username']).then(() => {         
          this.storage.set('uid', res.details['id']).then(() => {         
          this.navCtrl.setRoot('HomePage');         
              });
           
            });
        });
      
    }else{

      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter correct credentials.',
        buttons: ['OK']
      });
      alert.present(); 
    }
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

  onForgotPassword() {
    this.navCtrl.push('ForgetpasswordPage');
  }

}
