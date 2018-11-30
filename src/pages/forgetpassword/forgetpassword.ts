import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';

/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  public loguser:any;
  public rForm: FormGroup;
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
    public events: Events,
    private myApp:MyApp
  ) {
    this.events.publish("Msg", "Hello World");

      this.rForm = builder.group({
        'email': ['', Validators.compose([Validators.required])]
      });
      events.publish('hideFooter', { isHidden: true});

      this.lottieConfig = {
        path: 'assets/animation-w512-h512.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  forgotPass(formData) {  
    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Loading Please Wait...',
      duration: 3000
    });
    loading.present();  
    this.authService.forgetpass(formData).subscribe(res => {     
    if(res.ack==1){    
      const alert = this.alertCtrl.create({
        title: 'Success', 
        subTitle: res.message,        
        buttons: ['OK']
      });
      alert.present();  
      this.storage.ready().then(() => {        
        this.navCtrl.setRoot('SigninPage'); 
      });
    
  }else{
    const alert = this.alertCtrl.create({
      title: 'Please enter correct email.',
      buttons: ['OK']
    });
    alert.present(); 
  }
  }, err => {
    console.log(err);
  });
} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

}
