import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, ToastController, Platform, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage'

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Config } from './../../config';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  rForm: FormGroup;
  responseData: any;
  error: string;
  user_id: any;
  user_details: any;
  busy: boolean;
  isValidEmail = true;
  passwordmatch =true;
  checkEmailExist =true;
  imageURI:any;
  imageFileName:any;
  apiUrl = Config.baseUrl;

  public lottieConfig: Object;
  lastImage: string = null;
  currentid:any;
  uploadsuccess:any;
  rideid:any;
  usersdetails: any;
  image_path: any;
  pimg: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public authService:AuthServiceProvider,
    public toastCtrl:ToastController,
    private actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private transfer: FileTransfer,
    private file: File, 
    private filePath: FilePath,
    private camera: Camera
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

  public myProfile(){
    this.navCtrl.push('MyprofilePage');
  }

  public changePassword(){
    this.navCtrl.push('ChangePasswordPage');
  }

  ionViewDidLoad() {
    let uidSet={
      "user_id":this.user_id
    };
    this.authService.getuserdetails(uidSet).subscribe(res => {
      console.log(res);
      let details = res      
          if(details.Ack == 1){             
                this.usersdetails=details.userdetails;
                this.image_path=details.image_path;
                this.pimg = this.usersdetails.pimg;
                console.log(this.usersdetails.pimg);                            
          }
    });
  

  }

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
   console.log("data dir",cordova.file.dataDirectory);
  
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("NEWFILENAMEEEEEE",this.lastImage);
      this.uploadImage(this.lastImage);
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
    //console.log("IMAGGGEGGEGGEGE",img);
    if (img === null) {
      return '';
    } else {      
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(lastImage) { 
    console.log("dsfdsfs");  
    // Destination URL
    var url = this.apiUrl+"users/profile_image.json";
   
    // File for Upload
    var targetPath = this.pathForImage(lastImage);
   
    // File name only
    var filename = lastImage;
   
    var options = {
      fileKey: "photo",
      photo: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'photo':filename,
      'user_id':this.user_id
       }
     // params : {'fileName': filename}
    };
    console.log("OPTIONS",options);
    const fileTransfer:FileTransferObject = this.transfer.create();
   
    // this.loading = this.loadingCtrl.create({
     //  content: 'Uploading...',
    // });
     //this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log('UPLOADDDD',data);
      //this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
      //this.navCtrl.push('HomePage');
    }, err => {
      console.log("Error",err);
      //this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

}
