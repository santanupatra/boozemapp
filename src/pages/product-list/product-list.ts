import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})

export class ProductListPage {
  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  isValidEmail = true;
  cId: any;
  cate_name: any;
  productArray: any;
  link: any;
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
  ) {
    this.cId=navParams.get('param');

    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    }; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    
    let cidSet={
      "cid":this.cId
    };
    
    this.authService.getproductlist(cidSet).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){
              console.log(details.category);
                this.productArray=details.products;                  
                this.cate_name = details.cate_name;
                this.link = details.link;            
          }
    });
  }

  goDetails(id){
    this.navCtrl.push('ProductDetailsPage',{param:id});
  }

}
