import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';
import { VerificationsService } from 'src/app/Services/verifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //String Login
  loginEmail:string= '';
  loginPassword:string= '';

  //String Register
  registerUsername:String= '';
  registerEmail:String= '';
  registerPassword:String= '';
  registerVerifyPassword:String= '';

  constructor(private verify:VerificationsService, private storage:StorageService, private router:Router) { }

  ngOnInit() {
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //Registrar datos
  registerConfirm() {
    //verificar acá el registro
    if (this.registerEmail == '') {
      alert("Debe ingresar un correo");
      return;
    }
    if (this.registerPassword == '') {
      alert("Debe ingresar una contraseña");
      return;
    }
    if (this.registerPassword != this.registerVerifyPassword) {
      alert("Las contraseñas deben coincidir");
      return;
    }
    var registerUser = [{
      email:this.registerEmail,
      password:this.registerPassword
    }];

    this.storage.guardarUsuario(registerUser);
    alert("Usuario creado");

    this.modal.dismiss(null, 'confirm');
  }

  //Verificar datos
  async login(){

    const dates: any[] = await this.storage.obtenerUsuario();
    const loginDates = dates[0];
    const verifyDates: boolean = await this.verify.verifyDates(this.loginEmail, loginDates.email, this.loginPassword, loginDates.password);

    if (verifyDates == false) {
      return;
    }else{
      alert("Ingreso correcto");
      this.router.navigateByUrl("home");
    }

  }

  recoverPassword(){
    this.router.navigateByUrl("recover-password");
  }
}
