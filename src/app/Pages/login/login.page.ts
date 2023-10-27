import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';
import { VerificationsService } from 'src/app/Services/verifications.service';
import { Region } from 'src/app/Models/region';
import { Comuna } from 'src/app/Models/comuna';
import { LocationService } from 'src/app/Services/location.service';

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
  registerUsername:string= '';
  registerEmail:string= '';
  registerPassword:string= '';
  registerVerifyPassword:String= '';

  //Regions and comunes
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  constructor(private verify:VerificationsService,
              private storage:StorageService,
              private router:Router,
              private locationService:LocationService)
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
  registerConfirm() {

    if (this.registerUsername == '') {
      alert("Nombre vacio");
      return;
    }
    if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.registerUsername)) {
      alert('Nombre incorrecto');
      return;
    }
    if (this.registerEmail == '') {
      alert("Debe ingresar un correo");
      return;
    }
    if (!/@gmail\.com$/.test(this.registerEmail) && !/@duocuc\.cl$/.test(this.registerEmail)) {
      alert('Solo se aceptan @gmail.com o @duocuc.cl');
      return;
    }
    if (this.registerPassword == '') {
      alert("Debe ingresar una contraseña");
      return;
    }
    if (!/[0-9]/.test(this.registerPassword) && !/[!@#$%&*()_+]/.test(this.registerPassword)){
      alert('La contraseña debe tener almenos 1 número y 1 caracter especial de entre los siguientes (!@#$%&*()_+)');
      return;
    }
    if (this.registerPassword != this.registerVerifyPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
      var registerUser = [{
      name:this.registerUsername,
      email:this.registerEmail,
      password:this.registerPassword
      /* ,
      region:this.regiones,   pendiente
      commune:this.comunaSel */
    }];

    this.storage.guardarUsuario(registerUser);
    alert("Usuario creado");
    console.log(registerUser);

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
