import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-scan',
  templateUrl: './register-scan.page.html',
  styleUrls: ['./register-scan.page.scss'],
})
export class RegisterScanPage implements OnInit {

  data: any[] = [];
  cards: any[] = [];

  constructor(private storage:StorageService, private router:Router) { }

  async ngOnInit() {
  }

  async generateCards() {
    this.data = await this.storage.obtenerRegistro();

    this.cards = this.data.map(item => ({
      name: item.scan,
      email: item.gps,
      imagen: item.photo,
    }));
  }

  async backHome() {
    this.router.navigateByUrl("home");
  };
}
