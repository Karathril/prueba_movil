import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado:string = '';
  geolocationResult:string = '';


  constructor(private storage:StorageService) {}

  async starScanner(){

    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body')!.classList.add('scanner-active');
    let result = await BarcodeScanner.startScan();
    document.querySelector('body')!.classList.remove('scanner-active');

    //Geolocation
    const coordinates = await Geolocation.getCurrentPosition();
    const geolocationData = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
    this.geolocationResult = `Latitud: ${geolocationData.latitude}, Longitud: ${geolocationData.longitude}`;

    //Camera
    const imageElement = document.getElementById("imageElement") as HTMLImageElement;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;

    if (imageUrl !== undefined) {
      imageElement.src = imageUrl;
      imageElement.classList.remove("invisible");
    }

    if (result.content !== undefined) {
      this.resultado = result.content;
    }

    var registerRegister = [{
      scan:this.resultado,
      gps:this.geolocationResult,
      photo:imageUrl
    }];

    this.storage.guardarUsuario(registerRegister);
    alert("Registrado");
    console.log(registerRegister);
  };





}
