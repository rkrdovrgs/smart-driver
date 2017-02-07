import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { ConnectivityService  } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';

/*
  Generated class for the Mapview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html'
})
export class MapviewPage {

@ViewChild('map') mapElement: ElementRef;
//variables
map: any;
mapInitialised : boolean = false;
apiKey: any = 'AIzaSyAma_8qjE8BvEsQhBWPwDvTomud1JHNsg4';

  constructor(public navCtrl: NavController, public navParams: NavParams, public connectivityService: ConnectivityService, public loadingController: LoadingController) {
   //load the map
    this.loadMaps();
  }

  loadMaps() {
     this.addConnectivityListeners();

 //verify that the maps is not charge
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
     //Google maps JavaScript needs to be loaded
    this.disableMap();
     //verify that the user is online
    if(this.connectivityService.isOnline())
    {
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
      //inject the script in the document
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      this.initMap();
      this.enableMap();
    }
    else {
      this.disableMap();
    }
 
  }
}

initMap(){
 
    this.mapInitialised = true;
    let loading = this.loadingController.create({
      content: 'Locating...'
    });
    loading.present();//show a message loader
    
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      loading.dismiss();
    });
 
  }

    disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

  //add marker
  addMarker(){
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>You are here!</h4>";          
 
  this.addInfoWindow(marker, content);
  }

  //add info to the Marker
  addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
}
