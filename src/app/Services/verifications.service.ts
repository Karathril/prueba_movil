import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationsService {

  constructor() { }

  async verifyEmail(email:string, loginEmail:string){
    if (email == '') {
      alert('Correo vacio');
      return false;
    }else if (!/@gmail\.com$/.test(email) && !/@duocuc\.cl$/.test(email)){
      alert('Solo se aceptan @gmail.com o @duocuc.cl');
      return false;
    }else if ( email != loginEmail){
      alert('Correo o contraseña incorrecta');
      return false;
    }else {
      return true;
    }
  }

  async verifyPassword(password:string, loginPassword:string){
    if (password == '') {
      alert('Contraseña vacio');
      return false;
    }else if ( password != loginPassword){
      alert('Correo o contraseña incorrecta');
      return false;
    }else {
      return true;
    }
  }

}
