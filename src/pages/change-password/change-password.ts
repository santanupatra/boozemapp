import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
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
    public storage: Storage,
    private fb: FormBuilder
  ) {
    this.user_details =  JSON.parse(localStorage.getItem('userData'));
      this.user_id = this.user_details.id;

    this.rForm = fb.group({
      'current_password':[null, Validators.required],
      'new_password':[null, Validators.required],
      'con_password':[null, Validators.required]          
    }); 

    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  onSubmit(formData) {
    formData.user_id=this.user_id;    
    if (!this.rForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Error!',
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
     this.authService.changepass(formData).subscribe(res=>{      
       if(res.Ack == 1){        
         const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: res.message,
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('ProfilePage');
       }
       else{
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: res.message,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
