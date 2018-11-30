import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the WineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
})
export class WineListPage {
  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  isValidEmail = true;
  pId:any;
  categoryArray:any;
  data:any;
  link:any;
  cate_name:any;  
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
    this.pId=navParams.get('param');
    //console.log(this.pId);
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WineListPage');
    let pidSet={
      "p_id":this.pId
    };
    this.authService.getsubboozelist(pidSet).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
                this.categoryArray=details.category;  
                this.link=details.link;
                this.cate_name = details.cate_name            
          }
    });
  }

  goProductList(id){
    this.navCtrl.push('ProductListPage', {param:id});
  }

}
