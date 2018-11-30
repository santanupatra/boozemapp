import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  rForm: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isValidEmail = true;
  passwordmatch =true;
  checkEmailExist =true;
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public events: Events,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      'username': [null, Validators.required],      
      'email':[null, Validators.required],
      'password': [null, Validators.required],
      'con_password': [null, Validators.required],
      'postcode': [null, Validators.required]     
    }); 
    
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    }; 
  }

  public checkpassword(conpass,frmval)
  {
    console.log(frmval.password);
    console.log(conpass);
    if(frmval.password == conpass)
    {
     this.passwordmatch = true;
    }
    else{
      this.passwordmatch = false;
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  

  onSubmit(formData) {
    console.log(formData);
    console.log(this.rForm.valid);
    if (!this.rForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Signup Failed!',
        subTitle: "Please fill all the details.",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let loading = this.loadingCtrl.create({
        spinner: 'show',
        content: 'Loading Please Wait...',
        duration: 3000
      });
      loading.present();
     console.log(formData);
     this.authService.signup(formData).subscribe(res=>{
       let details = res.details
       if(details.ack == 1){
        console.log(res);
         const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Registration Successfully Done. Please Click in Your Mail',
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('SigninPage');
       }
       else{
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: details.message,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
      
    }
  }

  public login(){       
      this.navCtrl.push('SigninPage');        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
