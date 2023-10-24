import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(IonModal) modal!: IonModal;

  name: string = '';

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    //verificar acá el registro
    this.modal.dismiss(this.name, 'confirm');
  }


}
