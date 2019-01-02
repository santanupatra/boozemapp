import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportsPage } from './daily-reports';

@NgModule({
  declarations: [
    DailyReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportsPage),
  ],
})
export class DailyReportsPageModule {}
