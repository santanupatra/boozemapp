import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , LoadingController, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the CocktailCostingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocktail-costing',
  templateUrl: 'cocktail-costing.html',
})
export class CocktailCostingPage {
  cForm: FormGroup;
  public data:any;
  public nonBoozeArray = [];
  public boozeArray = [];
  public user_details:any;
  private user_id:any;
  public selectedValue = [];
  public boozeValue = [];
  public boozeName = [];
  public boozeId = [];
  public nonboozeId = [];
  public nonboozeValue =[];
  public isNonBooze = false;
  public isBooze = false;
  public booseHtml:any;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    public fb: FormBuilder
  ) {

      this.user_details =  JSON.parse(localStorage.getItem('userData'));
      this.user_id = this.user_details.id;

      this.cForm = fb.group({
        'booze_list':[null, Validators.required],
        'nonbooze_list':[null, Validators.required],
        'garnish':[null, Validators.required],
        'cocktail_name':[null, Validators.required],
        'nonbooze_id':[null],
        'booze_id':[null],
        'quantity[]':[null]      
      }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CocktailCostingPage');
    this.getNonBooze();
    this.getBooze();
  }

  cocktailCosting2(formData){
    this.navCtrl.push("CocktailCosting2Page", formData);
  }
  
  getNonBooze(){
    this.authService.getnonboozelist(this.data).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){              
                this.nonBoozeArray=details.products;                      
          }
    });
  }

  getBooze(){
    let udata={
      "user_id":this.user_id
    };
    this.authService.getboozeProduct(udata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){              
                this.boozeArray=details.products;                      
          }
    });
  }

  updateCheckedOptions(data:Object, isChecked: boolean) {

    if (isChecked) {
      this.selectedValue.push(data);
    } else {
     let newArray = this.selectedValue.filter(function(el) {
       return el !== data;
    });
     this.selectedValue = newArray;
   }
   console.log(this.selectedValue);
   
   
  }

  selectnonBoose(){
    this.isNonBooze = false;
    console.log(this.selectedValue);
    this.nonboozeId = [];
   this.nonboozeValue = [];
   for (var i=0; i< this.selectedValue.length; i++) {   
      this.nonboozeId.push(this.selectedValue[i]["id"]);
      this.nonboozeValue.push(this.selectedValue[i]["name"]);
      this.cForm.controls['nonbooze_list'].setValue(this.nonboozeValue.join(","));
      this.cForm.controls['nonbooze_id'].setValue(this.nonboozeId.join(","));
    }
  }

  updateCheckbooze(data:Object, isChecked: boolean){
    if (isChecked) {
      this.boozeValue.push(data);     
    } else {
     let newArray = this.boozeValue.filter(function(el) {
       return el !== data;
    });
     this.boozeValue = newArray;     
   }

    
  }

  selectBoose(){
    this.isBooze = false;
    console.log(this.selectedValue);
    this.boozeId = [];
    this.boozeName = [];
    this.booseHtml = this.boozeValue;
    for (var i=0; i< this.boozeValue.length; i++) {   
      this.boozeId.push(this.boozeValue[i]["id"]);
      this.boozeName.push(this.boozeValue[i]["name"]);
      this.cForm.controls['booze_list'].setValue(this.boozeName.join(","));
      this.cForm.controls['booze_id'].setValue(this.boozeId.join(","));

      
      //this.booseHtml += `<ion-item><ion-input type=text></ion-input></ion-item>`;
      //this.booseHtml += '<ion-item>test</ion-item>';
    } 
    //console.log("this.booseHtml");
    //document.getElementById('booze_quantity').innerHTML = this.booseHtml;
  }


  
}
