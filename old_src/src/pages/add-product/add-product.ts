import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
    public pId:any;
    public lottieConfig: Object;
    public productdetails: any;
    public id: any;
    public name: any;
    public price: any;
    public image: any;
    pForm: FormGroup;
    public user_id:any;
    public user_details:any;

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
    private fb: FormBuilder
  ) {
    this.user_details =  JSON.parse(localStorage.getItem('userData'));
    this.user_id = this.user_details.id;
    this.pId=navParams.get('param');
    
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

    this.pForm = fb.group({
      'quantity':[null, Validators.required],
      'price':[null, Validators.required],
      'product_id':[null, Validators.required]     
    }); 
  }

  ionViewDidLoad() {
    let pidSet={
      "id":this.pId
    };
    
    this.authService.getproductdetails(pidSet).subscribe(res => {      
      let details = res      
          if(details.Ack == 1){   
                this.productdetails=details.details;                     
                this.id=this.productdetails.id;
                this.name= this.productdetails.name;               
                this.price= this.productdetails.price;
                this.image= this.productdetails.image;  
                this.pForm.controls['quantity'].setValue(1); 
                this.pForm.controls['product_id'].setValue(this.productdetails.id); 
                this.pForm.controls['price'].setValue(this.productdetails.price);             
                             
          }
    });


    
  }

  onAddproduct(formData){
    
      let loading = this.loadingCtrl.create({
        spinner: 'show',
        content: 'Loading Please Wait...',
        duration: 3000
      });
      loading.present();
     console.log(formData);
     formData.user_id = this.user_id;
     this.authService.orderProduct(formData).subscribe(details=>{ 
       console.log(details.Ack);      
       if(details.Ack == 1){       
         const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Order has been successfully submited.',
           buttons: ['OK']
         });
         alert.present();
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

  public eventHandler(value){    
    this.price = (value*this.productdetails.price);
    
    this.pForm.controls['price'].setValue(this.price);
  } 
  

}
