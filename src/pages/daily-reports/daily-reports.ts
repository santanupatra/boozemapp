import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
//import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { Storage } from '@ionic/storage';
//import { MenuController } from 'ionic-angular';

/**
 * Generated class for the DailyReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-reports',
  templateUrl: 'daily-reports.html',
})
export class DailyReportsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportsPage');
  }

  public goToExpanded(){    
    this.navCtrl.push('ExpandedReportPage');
  }

}
