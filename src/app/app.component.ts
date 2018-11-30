import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  public footerIsHidden: boolean = false;
  public id:any;
 public loguser:any;
 //public type:any;
  public istype:any;
  public className:string;

  public booze_menu: boolean = false;
  public weigh_menu: boolean = false;
  public cocktail_menu: boolean = false;
  public awaits_menu: boolean = false;
  public order_menu: boolean = false;
  public profile_menu: boolean = false;

  public home_footer: boolean = true;
  public memories_footer: boolean = false;
  public reports_footer: boolean = false;
  public orders_footer: boolean = false;

  public path:any;
  constructor(platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen, public events: Events,) {

      platform.ready().then(()=>{
       
        events.subscribe('hideFooter', (data) => {
          this.footerIsHidden = data.isHidden;
        })
      
      this.storage.get('uid').then(val => {
        this.id =val;   
       
        if(this.id){
              this.nav.setRoot('HomePage');             
        }else{          
          this.nav.setRoot('AfterSplashPage');
        }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
  // });
  });



})
  }

  public logout(){
      this.storage.ready().then(() => {
        //const data=localStorage.getItem("userData");
      localStorage.removeItem('userData');
      localStorage.setItem('userData',"");
      this.storage.set("uid","");
      this.events.publish('hideFooter', { isHidden: true});
    this.nav.setRoot('SigninPage');
    });
  }

    public boozeList(){
      this.booze_menu = true;
      this.weigh_menu = false;
      this.cocktail_menu = false;
      this.awaits_menu = false;
      this.order_menu = false;
      this.profile_menu = false;
      this.nav.push('BoozeListPage');
    }

    public cocktailList(){
      this.booze_menu = false;
      this.weigh_menu = false;
      this.cocktail_menu = true;
      this.awaits_menu = false;
      this.order_menu = false;
      this.profile_menu = false;
      this.nav.push('CocktailPage');
    }

    public wineList(){
     
      this.nav.push('HomeWinePage');
    }

    public profile(){
      this.booze_menu = false;
      this.weigh_menu = false;
      this.cocktail_menu = false;
      this.awaits_menu = false;
      this.order_menu = false;
      this.profile_menu = true;
      this.nav.push('ProfilePage');
    }
    
    public login(){       
        this.nav.push('SigninPage');        
    }
    public orders(){
      this.booze_menu = false;
      this.weigh_menu = false;
      this.cocktail_menu = false;
      this.awaits_menu = false;
      this.order_menu = true;
      this.profile_menu = false;

      this.home_footer = false;
      this.memories_footer = false;
      this.reports_footer = false;
      this.orders_footer = true;

      this.nav.push('OrdersPage');
    }
    public goToHome(){
      this.home_footer = true;
      this.memories_footer = false;
      this.reports_footer = false;
      this.orders_footer = false; 
      this.nav.push('HomePage');
    }
    public weighBooze(){
      this.booze_menu = false;
      this.weigh_menu = true;
      this.cocktail_menu = false;
      this.awaits_menu = false;
      this.order_menu = false;
      this.profile_menu = false;
      this.nav.push('WeighBoozePage');
    }
    public awaits(){
      this.booze_menu = false;
      this.weigh_menu = false;
      this.cocktail_menu = false;
      this.awaits_menu = true;
      this.order_menu = false;
      this.profile_menu = false;
      this.nav.push('MemoriesawaitsPage');
    }
    public goToReport(){
      this.home_footer = false;
      this.memories_footer = false;
      this.reports_footer = true;
      this.orders_footer = false;
      this.nav.push('DailyReportsPage');
    }
    public back(){
      this.nav.pop(); 
    }
    
    
    
    
    


}