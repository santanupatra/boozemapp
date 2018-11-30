import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  isValidEmail = true;
  id: any;
  productdetails: any;
  name:any;
  image:any;
  description: any;
  price: any;
  category: any;

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
  ) {
    this.id=navParams.get('param');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
   console.log(this.id)
     let pidSet={
      "id":this.id
    };
    
    this.authService.getproductdetails(pidSet).subscribe(res => {      
      let details = res      
          if(details.Ack == 1){   
                this.productdetails=details.details;                     
                this.id=this.productdetails.id;
                this.name= this.productdetails.name;
                this.image= this.productdetails.image;
                this.description= this.productdetails.description;
                this.price= this.productdetails.price;
                this.category= this.productdetails.category;
                             
          }
    });
  }

  public addProduct(id){
    this.navCtrl.push("AddProductPage", {param:id});
  }

}
