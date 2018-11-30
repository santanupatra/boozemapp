import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { Calendar } from '@ionic-native/calendar';
import { IonCalendarModule } from '@ionic2-extra/calendar';
import { ION_CALENDAR_DIRECTIVES, IonCalendar } from '@ionic2-extra/calendar';


import { CalendarModule } from 'angular-calendar';

import { MyApp } from './app.component';

import { AuthProvider } from '../providers/auth/auth';
import { ApiProvider } from '../providers/api/api';
import { ServiceProvider } from '../providers/service/service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    IonCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    ApiProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    Calendar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
