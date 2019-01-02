import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the YourCocktailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-cocktail',
  templateUrl: 'your-cocktail.html',
})
export class YourCocktailPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  public user_details: any;
  public user_id: any; 
  public cocktailArray = [];
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
    
    let uidSet={
      "user_id":this.user_id
    };
    this.authService.cocktailList(uidSet).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
                this.cocktailArray=details.cocltails; 
                            
          }
    });
  }

  details(){
    this.navCtrl.push('CocktailRecipePage')
  }

}
