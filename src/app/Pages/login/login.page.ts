import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';
import { VerificationsService } from 'src/app/Services/verifications.service';
import { Region } from 'src/app/Models/region';
import { Comuna } from 'src/app/Models/comuna';
import { LocationService } from 'src/app/Services/location.service';
import { Platform } from '@ionic/angular';
import { AlertsService } from 'src/app/Services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  //String Login
  loginUserName:string= '';
  loginPassword:string= '';

  //String Register
  registerUsername:string= '';
  registerEmail:string= '';
  registerPassword:string= '';
  registerVerifyPassword:string= '';

  //Regions and comunes
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;


  constructor(private verify:VerificationsService,
              private storage:StorageService,
              private router:Router,
              private locationService:LocationService,
              private platform: Platform,
              private alerts:AlertsService)
              { }

  ngOnInit() {
    this.cargarRegion();
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');

  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }

  //Registrar datos
  async registerConfirm() {
    const verifyRegister: boolean = await this.verify.verifyDatesRegister(this.registerUsername, this.registerEmail, this.registerPassword, this.registerVerifyPassword);
    const regionSelect = this.regiones.find(region => region.id === this.regionSel);
    const comunaSelect = this.comunas.find(comuna => comuna.id === this.comunaSel);
    if (verifyRegister == false) {
      return;
    }else{
      var registerUser = [{
        name:this.registerUsername,
        email:this.registerEmail,
        password:this.registerPassword,
        region:regionSelect?.nombre,
        commune:comunaSelect?.nombre
      }];

      this.storage.guardarUsuario(registerUser);
      this.alerts.Alerts("Usuario creado con exito","");
      console.log(registerUser);

      this.modal.dismiss(null, 'confirm');
    }
  }

  //Verificar datos
  async login(){

    const dates: any[] = await this.storage.obtenerUsuario();
    const loginDates = dates[0];
    const verifyDates: boolean = await this.verify.verifyDates(this.loginUserName, loginDates.name, this.loginPassword, loginDates.password);

    if (verifyDates == false) {
      return;
    }else{
      this.alerts.Alerts(loginDates.name,"Bienvenido");
      this.router.navigateByUrl("home");
    }

  }

  recoverPassword(){
    this.router.navigateByUrl("recover-password");
  }

}
