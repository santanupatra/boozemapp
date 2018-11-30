import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeBeerPage } from './home-beer';

@NgModule({
  declarations: [
    HomeBeerPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeBeerPage),
  ],
})
export class HomeBeerPageModule {}
