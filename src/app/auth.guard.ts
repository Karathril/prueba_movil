import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './Services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } */
  constructor (private storage:StorageService, private router:Router ) {

  }


  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Comprueba si el nombre de usuario existe en el almacenamiento de preferencias
    const dates: any[] = await this.storage.obtenerUsuario();
    const loginDates = dates[0];

    if (loginDates.name) {
      return true; // El usuario está autenticado, permite el acceso a la ruta
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión u otra página
      this.router.navigate(['/login']); // Reemplaza '/login' con la ruta correcta
      return false;
    }
  }

}
