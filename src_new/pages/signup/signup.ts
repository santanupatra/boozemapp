import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
data : any = {
  cityLat : '22.580949',
  cityLng : '88.480597'
  };
  	constructor(public navCtrl: NavController,
        				public navParams: NavParams,
        				public api:ApiProvider,
        				private AuthService: AuthProvider,
            		private service: ServiceProvider
              ) {
  }

  	Signup(data) {
        console.log(data);
        this.api.post('register-user',data).subscribe((response : any)  => {
            console.log(response);
            if(response.ack === 1){
                this.navCtrl.setRoot('SigninPage');
                this.service.popup('Success', 'Signup success');
            }else if(response.ack === 2){
                this.service.popup('Alert', 'Email id already exist');
            }else{
            	this.service.popup('Alert', 'Signup Failed');
            }
        }, err => {
            console.log(err.message);
        });
    }

    signin(){
      this.navCtrl.push("SigninPage");
    }

}
