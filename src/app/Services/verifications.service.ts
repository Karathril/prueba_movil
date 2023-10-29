import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationsService {

  constructor(private alerts:AlertsService) { }

  async verifyDates(name:string, loginName:string, password:string, loginPassword:string){

    if(name == '') {
      this.alerts.Alerts("User Name vacio","User Name");
      return false;
    }else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(name)){
      this.alerts.Alerts("User Name incorrecto","User Name");
      return false;
    }else if (name != loginName){
      this.alerts.Alerts("User Name o contraseña incorrecta","User Name");
      return false;
    }if (password == '') {
      this.alerts.Alerts("Contraseña vacio","Contraseña");
      return false;
    }else if (password != loginPassword){
      this.alerts.Alerts("Correo o contraseña incorrecta","Contraseña");
      return false;
    }else {
      return true;

    }
  }

  async verifyDatesRegister (registerName:string, registerEmail:string, registerPassword:string, registerVerifyPassword:string, ){
    if (registerName == '') {
      this.alerts.Alerts("Nombre vacio","Nombre");
      return false;
    }else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(registerName)) {
      this.alerts.Alerts("Nombre incorrecto","Nombre");
      return false;
    }else if (registerEmail == '') {
      this.alerts.Alerts("Debe ingresar un correo","correo");
      return false;
    }else if (!/@gmail\.com$/.test(registerEmail) && !/@duocuc\.cl$/.test(registerEmail)) {
      this.alerts.Alerts("Solo se aceptan @gmail.com o @duocuc.cl","correo");
      return false;
    }else if (registerPassword == '') {
      this.alerts.Alerts("Debe ingresar una contraseña","contraseña");
      return false;
    }else if (!/[0-9]/.test(registerPassword) && !/[!@#$%&*()_+]/.test(registerPassword)){
      this.alerts.Alerts("La contraseña debe tener almenos 1 número y 1 caracter especial de entre los siguientes (!@#$%&*()_+)","contraseña");
      return false;
    }else if (registerPassword != registerVerifyPassword) {
      this.alerts.Alerts("Las contraseñas no coinciden","contraseña");
      return false;
    }else {
      return true;

    }
  }

  async verifyRecover(ecoverUsername:string, name:string){
    if (ecoverUsername != name){
      this.alerts.Alerts("El User no corresponde","User");
      return false;
    }else{
      return true;
    }
  }
}
