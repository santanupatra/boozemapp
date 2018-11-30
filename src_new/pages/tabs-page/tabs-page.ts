import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

//import { AboutPage } from '../about/about';
//import { MapPage } from '../map/map';
//import { SchedulePage } from '../schedule/schedule';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
//  tab1Root: any = SchedulePage;
  //tab2Root: any = SpeakerListPage;
//  tab3Root: any = MapPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
