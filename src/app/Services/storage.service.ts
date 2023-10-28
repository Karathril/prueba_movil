import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const storageUsuario = 'usuarioData';
const storageRegister = 'registerData';
@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  async setItem(llave:string,valor:string){
    await Preferences.set({key:llave,value:valor})
  }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async guardarUsuario(user:any[]){
    var userStorage = await this.obtenerUsuario();

    for (const i of userStorage) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(storageUsuario,JSON.stringify(user));
  }

  async obtenerUsuario(){
    const storageData = await this.getItem(storageUsuario);

    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);

    if (data) {
      return data;
    }
    else{
      return [];
    }
  }

  async guardarRegistro(register:any[]){
    var registerStorage = await this.obtenerRegistro();

    for (const i of registerStorage) {
      if (i) {
        register.push(i);
      }
    }
    this.setItem(storageRegister,JSON.stringify(register));
  }

  async obtenerRegistro(){
    const storageData = await this.getItem(storageRegister);

    if (storageData == null) {
      return [];
    }

    const data:any[] = JSON.parse(storageData);

    if (data) {
      return data;
    }
    else{
      return [];
    }
  }
}

