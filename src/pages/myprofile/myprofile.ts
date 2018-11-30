import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
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
      'first_name':[null, Validators.required],
      'last_name':[null, Validators.required],
      'business_name':[null, Validators.required],
      'email':[null, Validators.required],
      'phone':[null, Validators.required],
      'address':[null, Validators.required],
      'city':[null, Validators.required],
      'country':[null, Validators.required],      
      'postcode': [null, Validators.required]     
    }); 
    
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
  
  onSubmit(formData) {
    formData.user_id=this.user_id;
    console.log(this.user_id);
    console.log(this.rForm.valid);
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
     this.authService.updateprofile(formData).subscribe(res=>{      
       if(res.Ack == 1){
        console.log(res);
        localStorage.setItem('userData', JSON.stringify(res.userupdatedata));
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

    if (this.storage.get('userdata'))
    {
      this.rForm.controls['first_name'].setValue(this.user_details.first_name);
      this.rForm.controls['last_name'].setValue(this.user_details.last_name);
      this.rForm.controls['business_name'].setValue(this.user_details.business_name);
      this.rForm.controls['email'].setValue(this.user_details.email);
      this.rForm.controls['phone'].setValue(this.user_details.phone);
      this.rForm.controls['city'].setValue(this.user_details.city);
      this.rForm.controls['address'].setValue(this.user_details.address);
      this.rForm.controls['country'].setValue(this.user_details.country);      
      this.rForm.controls['postcode'].setValue(this.user_details.postcode);
    }
  else
  {
    this.rForm.controls['first_name'].setValue('');
    this.rForm.controls['last_name'].setValue('');
    this.rForm.controls['phone'].setValue('');
    this.rForm.controls['city'].setValue('');
    this.rForm.controls['address'].setValue('');
    this.rForm.controls['country'].setValue('');   
    this.rForm.controls['postcode'].setValue('');
  }
}

}
