import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;  
  private user_details: any;
  private user_id : any;
  private products:any;
  
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
    events.publish('hideFooter', { isHidden: false});
    this.user_details =  JSON.parse(localStorage.getItem('userData'));
      this.user_id = this.user_details.id;
    
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');    
    this.userProduct();
   /* let udata={
      "user_id":this.user_id
    };

    this.authService.userProducts(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
              this.products=details.products;
          }
    });  */ 
  }
  userProduct(){
    let udata={
      "user_id":this.user_id
    };

    this.authService.userProducts(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
              this.products=details.products;
          }
    });
  }

  deleteProduct(id, j, i){
    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Loading Please Wait...',
      duration: 3000
    });
    loading.present();
    
    let udata={
      "id":id
    };
    this.authService.deleteProduct(udata).subscribe(res => {
      if(res.Ack==1){ 
        //this.products[j][i] = [];
        //this.products.splice([j][i], 1);
        //(this.companies).splice(no, 1);
        //this.userProduct();
        this.userProduct();      
         loading.dismiss();
      
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

  
  //className: any='wine-holder';
  pressed(j,i) {    
    this.products[j][i]['className'] = 'wine-holder-shake';    
  }
  released(j,i){
    //this.className = 'wine-holder';
    this.products[j][i]['className'] = 'wine-holder';
    
  }
  active(j,i) {
    this.products[j][i]['cross'] = 'cross-display';
  }

  onSearch() {
    this.navCtrl.push('SearchPage');
  }

}
