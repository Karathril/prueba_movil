import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado:string = '';
  geolocationResult:string = '';

  constructor() {}

  async starScanner(){

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    document.querySelector('body')!.classList.add('scanner-active');

    let result = await BarcodeScanner.startScan();

    document.querySelector('body')!.classList.remove('scanner-active');

    const coordinates = await Geolocation.getCurrentPosition();
    const geolocationData = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
    this.geolocationResult = `Latitud: ${geolocationData.latitude}, Longitud: ${geolocationData.longitude}`;


    if (result.content !== undefined) {
      this.resultado = result.content;

    }

    if (result.hasContent) {
      console.log(result.content);
    }
  };



}
