import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado:string = '';

  constructor() {}

  async starScanner(){

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    document.querySelector('body')!.classList.add('scanner-active');

    let result = await BarcodeScanner.startScan();

    document.querySelector('body')!.classList.remove('scanner-active');


    if (result.content !== undefined) {
      this.resultado = result.content;
    }

    if (result.hasContent) {
      console.log(result.content);
    }
  };


}
