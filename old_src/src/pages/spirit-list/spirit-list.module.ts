import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpiritListPage } from './spirit-list';

@NgModule({
  declarations: [
    SpiritListPage,
  ],
  imports: [
    IonicPageModule.forChild(SpiritListPage),
  ],
})
export class SpiritListPageModule {}
