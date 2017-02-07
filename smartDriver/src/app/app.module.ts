//import { NgModule, ErrorHandler } from '@angular/core';
//import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapviewPage } from '../pages/mapview/mapview';
import { UserviewPage } from '../pages/userview/userview';
import { ConnectivityService  } from '../providers/connectivity-service';

@NgModule({
  declarations: [
    MyApp,
    MapviewPage,
    UserviewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapviewPage,
    UserviewPage
  ],
  providers: [ConnectivityService]
})
export class AppModule {}
