import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';


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



  async takePicture() {
    const imageElement = document.getElementById("imageElement") as HTMLImageElement;
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    if (imageUrl !== undefined) {
      imageElement.src = imageUrl;
    } else {
      // Manejar el caso en el que imageUrl es undefined, por ejemplo, establecer una imagen de reemplazo
    }

  };



}
