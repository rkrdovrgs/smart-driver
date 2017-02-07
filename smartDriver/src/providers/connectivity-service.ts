import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ConnectivityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var Connection;

@Injectable()
export class ConnectivityService {
  onDevice: boolean;

  constructor(public platform: Platform) {
    this.onDevice= this.platform.is('cordova');
  }
 isOnline(): boolean{
   if(this.onDevice && Network.type){
     return Network.type !== Connection.NONE;
   }
   else{
     return navigator.onLine;
   }
 }

 isOffLine():boolean{
   if(this.onDevice && Network.type){
     return Network.type === Connection.NONE;
   }
   else
   {
     return !navigator.onLine;
   }
 }
}
