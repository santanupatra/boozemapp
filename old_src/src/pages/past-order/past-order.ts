import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the PastOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past-order',
  templateUrl: 'past-order.html',
})
export class PastOrderPage {
  private user_details: any;
  private user_id : any;
  public orders: any;
  constructor(
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastOrderPage');
    this.orderList();
  }

  orderList(){
    let udata={
      "user_id":this.user_id
    };

    this.authService.pastOrder(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
              this.orders=details.orderdetails;
          }
    });
  }
}
