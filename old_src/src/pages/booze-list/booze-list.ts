import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';

/**
 * Generated class for the BoozeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booze-list',
  templateUrl: 'booze-list.html',
})
export class BoozeListPage {

  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  isValidEmail = true;
  users: any;
  data:any;
  categoryArray:any;
  link:any;
  pId:any;
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
    //this.pId=navParams.get('param');
    this.lottieConfig = {
      path: 'assets/animation-w512-h512.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoozeListPage');    
    this.authService.getboozelist(this.data).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){
              console.log(details.category);
                this.categoryArray=details.category;  
                this.link=details.link;            
          }
    });
  }

  public getSubList(id){
    this.navCtrl.push('WineListPage', {param:id});
  }

  public beerList(){
    this.navCtrl.push('BeerListPage');
  }
  public spiritList(){
    this.navCtrl.push('SpiritListPage');
  }

  public onSearch() {
    this.navCtrl.push('SearchPage');
  }

}
