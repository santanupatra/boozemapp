import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';
import { ServiceProvider } from '../providers/service/service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar,splashScreen: SplashScreen, private AuthService: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(AuthService.getuserid() );
      if( AuthService.getuserid() ){
        this.rootPage = 'HomePage';
      }else{
        this.rootPage = 'SigninPage';
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  gotopage(page){
    this.nav.push(page);
  }
}

