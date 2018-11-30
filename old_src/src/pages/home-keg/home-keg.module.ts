import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeKegPage } from './home-keg';

@NgModule({
  declarations: [
    HomeKegPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeKegPage),
  ],
})
export class HomeKegPageModule {}
