import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { VerificationsService } from 'src/app/Services/verifications.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  recoverUsername:string= '';

  constructor(private router:Router, private storage:StorageService, private verify:VerificationsService) { }

  ngOnInit() {
  }

  recoverback(){
    this.router.navigateByUrl("login");
  }

  async recoverPassword(){

    const dates: any[] = await this.storage.obtenerUsuario();
    const loginDates = dates[0];
    const verifyRecover: boolean = await this.verify.verifyRecover(this.recoverUsername, loginDates.name);

    if (verifyRecover == false) {
      return;
    }else{
      alert('Su contraseña es: "' +loginDates.password + '"');
      this.router.navigateByUrl("login");
    }


  }

}
