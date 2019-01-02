import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , LoadingController, Events, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Config } from './../../config';

declare var cordova: any;

/**
 * Generated class for the CocktailTotalPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocktail-total-price',
  templateUrl: 'cocktail-total-price.html',
})
export class CocktailTotalPricePage {
  cForm: FormGroup;
  public formvalue:any;
  public booze_id:any;
  public nonbooze_id:any;
  public cocktail_name: any;
  public booze_list: any;
  public nonbooze_list: any;
  public garnish: any;
  public booze_ounce: any;
  public booze_price: any;
  public nonbooze_ounce: any;
  public nonbooze_price: any;
  public garnish_amount: any;
  public user_details: any;
  public user_id: any; 
  public total_price: any; 
  public menu_price: any;
  public gross_profit: any;
  public total_amount: any;
  public photo: any;
  imageURI:any;
  imageFileName:any;
  apiUrl = Config.baseUrl;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    private fb: FormBuilder,

    private transfer: FileTransfer,
    private file: File, 
    private filePath: FilePath,
    private camera: Camera,
    public toastCtrl:ToastController,
    
  ) {

    this.user_details =  JSON.parse(localStorage.getItem('userData'));
    this.user_id = this.user_details.id;

    this.cForm = fb.group({
      'booze_ounce':[null, Validators.required],
      'booze_price':[null, Validators.required],
      'nonbooze_ounce':[null, Validators.required],
      'nonbooze_price':[null, Validators.required],
      'garnish_amount':[null, Validators.required],
      'booze_id':[null],
      'nonbooze_id':[null],
      'cocktail_name':[null],
      'garnish':[null],
      'total_amount':[null],
      'photo':[null]

    }); 
  }

  ionViewDidLoad() {
      
      this.formvalue = this.navParams.data;
      console.log(this.formvalue);
      this.booze_id = this.formvalue.booze_id;
      this.nonbooze_id = this.formvalue.nonbooze_id;
      this.cocktail_name = this.formvalue.cocktail_name;
      this.booze_list = this.formvalue.booze_list;
      this.nonbooze_list = this.formvalue.nonbooze_list;
      this.garnish = this.formvalue.garnish;
      this.booze_ounce = this.formvalue.booze_ounce;
      this.booze_price = this.formvalue.booze_price;
      this.nonbooze_ounce = this.formvalue.nonbooze_ounce;
      this.nonbooze_price = this.formvalue.nonbooze_price;
      this.garnish_amount = this.formvalue.garnish_amount;
      this.photo = this.formvalue.photo;

      this.cForm.controls['booze_id'].setValue(this.booze_id);
      this.cForm.controls['nonbooze_id'].setValue(this.nonbooze_id);
      this.cForm.controls['cocktail_name'].setValue(this.cocktail_name);      
      this.cForm.controls['garnish'].setValue(this.garnish);
      this.cForm.controls['booze_ounce'].setValue(this.booze_ounce);
      this.cForm.controls['booze_price'].setValue(this.booze_price);
      this.cForm.controls['nonbooze_ounce'].setValue(this.nonbooze_ounce);
      this.cForm.controls['nonbooze_price'].setValue(this.nonbooze_price);
      this.cForm.controls['garnish_amount'].setValue(this.garnish_amount);
      this.cForm.controls['photo'].setValue(this.photo);

    this.total_price = (this.booze_price*1 + this.nonbooze_price*1 + this.garnish_amount*1);
    this.menu_price = (this.booze_price*1 + this.nonbooze_price*1);
    this.gross_profit = (this.total_price*1 % 46);
    this.cForm.controls['total_amount'].setValue(this.total_price);
  }



  onSubmit(formData) {
    formData.user_id=this.user_id;
    
    if (!this.cForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "Please fill all the details.",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let loading = this.loadingCtrl.create({
        spinner: 'show',
        content: 'Loading Please Wait...',
        duration: 3000
      });
      loading.present();
     console.log(formData);
     this.authService.addCocktail(formData).subscribe(res=>{      
       if(res.Ack == 1){ 
         
         this.uploadImage(this.photo, res.cocktail_id);      
         const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: res.message,
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('YourCocktailPage');
       }
       else{
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: res.message,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
      
    }
  }

  public uploadImage(lastimage, id) {
    // Destination URL
    var url = this.apiUrl+"products/cocktail_image.json";
   
    // File for Upload
    var targetPath = this.pathForImage(lastimage);
   
    // File name only
    var filename = lastimage;
   
    var options = {
      fileKey: "photo",
      photo: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'photo':filename,
      'id':id
       }
     // params : {'fileName': filename}
    };
    console.log("OPTIONS",options);
    const fileTransfer:FileTransferObject = this.transfer.create();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {     
      //this.presentToast('Image succesful uploaded.');
      //this.navCtrl.push('HomePage');
    }, err => {
      console.log("Error",err);
      //this.loading.dismissAll()
      //this.presentToast('Error while uploading file.');
    });
  }

  public pathForImage(img) {
    console.log("IMAGGGEGGEGGEGE",img);
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

}
