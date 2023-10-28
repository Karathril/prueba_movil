import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationsService {

  constructor() { }

  async verifyDates(name:string, loginName:string, password:string, loginPassword:string){

    if(name == '') {
      alert('User Name vacio');
      return false;
    }else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(name)){
      alert('User Name incorrecto');
      return false;
    }else if (name != loginName){
      alert('User Name o contraseña incorrecta');
      return false;
    }if (password == '') {
      alert('Contraseña vacio');
      return false;
    }else if (password != loginPassword){
      alert('Correo o contraseña incorrecta');
      return false;
    }else {
      return true;

    }
  }

  async verifyDatesRegister (registerName:string, registerEmail:string, registerPassword:string, registerVerifyPassword:string, ){
    if (registerName == '') {
      alert("Nombre vacio");
      return false;
    }else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(registerName)) {
      alert('Nombre incorrecto');
      return false;
    }else if (registerEmail == '') {
      alert("Debe ingresar un correo");
      return false;
    }else if (!/@gmail\.com$/.test(registerEmail) && !/@duocuc\.cl$/.test(registerEmail)) {
      alert('Solo se aceptan @gmail.com o @duocuc.cl');
      return false;
    }else if (registerPassword == '') {
      alert("Debe ingresar una contraseña");
      return false;
    }else if (!/[0-9]/.test(registerPassword) && !/[!@#$%&*()_+]/.test(registerPassword)){
      alert('La contraseña debe tener almenos 1 número y 1 caracter especial de entre los siguientes (!@#$%&*()_+)');
      return false;
    }else if (registerPassword != registerVerifyPassword) {
      alert("Las contraseñas no coinciden");
      return false;
    }else {
      return true;

    }
  }

  async verifyRecover(ecoverUsername:string, name:string){
    if (ecoverUsername != name){
      alert('El User no corresponde');
      return false;
    }else{
      return true;
    }
  }
}
