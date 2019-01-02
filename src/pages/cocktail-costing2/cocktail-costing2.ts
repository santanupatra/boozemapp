import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , LoadingController, Events, Platform, ActionSheetController, ToastController } from 'ionic-angular';
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
 * Generated class for the CocktailCosting2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cocktail-costing2',
  templateUrl: 'cocktail-costing2.html',
})
export class CocktailCosting2Page {
  public cForm: FormGroup;
  public formvalue:any;
  public booze_id:any;
  public nonbooze_id:any;
  public cocktail_name: any;
  public booze_list: any;
  public nonbooze_list: any;
  public garnish: any;
  public booze_value = [];
  public boozeArray = [];
  public nonboozeArray = [];
  imageURI:any;
  imageFileName:any;
  apiUrl = Config.baseUrl;

  public lottieConfig: Object;
  lastImage: string = null;
  currentid:any;
  uploadsuccess:any;
  rideid:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    private fb: FormBuilder,
    public platform: Platform,
    private transfer: FileTransfer,
    private file: File, 
    private filePath: FilePath,
    private camera: Camera,
    public toastCtrl:ToastController,
  ) {


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
      'photo':[null]

    }); 

  }

  ionViewDidLoad() {
    
      this.formvalue = this.navParams.data;   
      this.booze_id = this.formvalue.booze_id;
      this.nonbooze_id = this.formvalue.nonbooze_id;
      this.cocktail_name = this.formvalue.cocktail_name;
      this.booze_list = this.formvalue.booze_list;
      this.nonbooze_list = this.formvalue.nonbooze_list;
      this.garnish = this.formvalue.garnish;

      this.cForm.controls['booze_id'].setValue(this.booze_id);
      this.cForm.controls['nonbooze_id'].setValue(this.nonbooze_id);
      this.cForm.controls['cocktail_name'].setValue(this.cocktail_name);      
      this.cForm.controls['garnish'].setValue(this.garnish);


    let data={
      "booze_id": this.formvalue.booze_id,   

    };
    this.authService.getboozeselected(data).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){              
                this.boozeArray=details.products;                      
          }
    });

    let nonboozedata={
      "nonbooze_id": this.formvalue.nonbooze_id,   

    }; 
    this.authService.getnonboozeselected(nonboozedata).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){              
                this.nonboozeArray=details.products;                      
          }
    });

    
   
   //this.cForm.push(this.initTechnologyFields(name)); 
  }

  cocktailTotalPrice(formData){    
    this.navCtrl.push("CocktailTotalPricePage", formData);
  }

  /*initTechnologyFields(name) : FormGroup
  {
     return this.fb.group({
        name 		: ['', Validators.required]
     });
  }*/

  presentActionSheet() {
    
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
          }
        } , {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }



  uploadFromCamera(sourceType){

    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
    
  }

  private createFileName(currentName) {
    var d = new Date(),
    n = d.getTime(),
   // newFileName=n+".jpg";
    newFileName=currentName;
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
   console.log("CURRENTFILENAME",currentName);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("NEWFILENAMEEEEEE",this.lastImage);
      var targetPath = this.pathForImage(this.lastImage);
      this.cForm.controls['photo'].setValue(targetPath);
    }, error => {
      this.presentToast('Error while storing file.');
    });

    
    
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
