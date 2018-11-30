import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
data : any = {};
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public api:ApiProvider,
                private AuthService: AuthProvider,
                private service: ServiceProvider
                ) {
    }

  signup(){
    this.navCtrl.push("SignupPage");
  }
  login(data){
    this.api.post('login-submit',data).subscribe((response : any)  => {
      console.log(response);
      if(response.ack === "1"){
          this.afloginsuccess(response);
      }else{
        this.service.popup('Alert', 'Wrong EmailId & Password');
      }
    }, err => {
      this.service.popup('Alert', 'Login Failed');
    });

  }

  afloginsuccess(response){
    console.log(response);
    localStorage.setItem("authID", response.user_id);
    localStorage.setItem("authTYPE", response.email);
    this.navCtrl.setRoot('HomePage');
    this.AuthService.initializeUserData({id: response.user_id, first_name: response.fname, last_name: response.lname, user_type: response.user_type,user_image: response.user_image});
    this.service.popup('Success', 'Successfully Login');
  }

  forgotpass(){
    this.navCtrl.push('ForgetpasswordPage');
  }

}
