import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateHome() {
      this.router.navigate(['/']); // Redirige a la página de inicio
  }

}
