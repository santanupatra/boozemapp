import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the PendingOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-order',
  templateUrl: 'pending-order.html',
})
export class PendingOrderPage {
  private user_details: any;
  private user_id : any;
  public orders: any;
  public toggleGroups: any = {};

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
    console.log('ionViewDidLoad PendingOrderPage');
    this.orderList();
  }

  orderList(){
    let udata={
      "user_id":this.user_id
    };

    this.authService.pendingOrder(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
              this.orders=details.orderdetails;
          }
          else{
            this.orders="";
          }
    })
  }

  changeStatus(id, index){
    let alert = this.alertCtrl.create({
      title: 'Confirm Order',
      message: 'Are you sure you want to confirm order?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Yes',
              handler: () => {
                let udata={
                  "order_id":id,
                  "order_status":"Arriving"
                };
                let loading = this.loadingCtrl.create({
                  spinner: 'show',
                  content: 'Loading Please Wait...',
                  duration: 3000
                });
                loading.present();
                this.authService.changeStatus(udata).subscribe(res => {
                  console.log(res);
                  let details = res      
                      if(details.Ack == 1){             
                        const alert = this.alertCtrl.create({
                          title: 'Success!',
                          subTitle: 'Order move to arriving.',
                           buttons: ['OK']
                         });
                       alert.present();
                       (this.orders).splice(index, 1);
                       //this.navCtrl.push('ArrivingOrderPage');
            
                      }
                });
              }
          }
      ]
  })
  alert.present();
    /*let udata={
      "order_id":id,
      "order_status":"Arriving"
    };
    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Loading Please Wait...',
      duration: 3000
    });
    loading.present();
    this.authService.changeStatus(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
            const alert = this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Order move to arriving.',
               buttons: ['OK']
             });
           alert.present();
           (this.orders).splice(index, 1);
           //this.navCtrl.push('ArrivingOrderPage');

          }
    });*/
  }

  

}
