import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  recoverUsername:string= '';

  constructor(private router:Router) { }

  ngOnInit() {
  }

  recoverback(){
    this.router.navigateByUrl("login");
  }

  recoverPassword(){
    this.router.navigateByUrl("login");
  }

}
