import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service/auth.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  router = inject(Router);
  authService = inject(AuthService);

  irAPublicaciones() {
    this.router.navigateByUrl('/publicaciones');
  }

  irAMiPerfil() {
    this.router.navigateByUrl('/mi-perfil');
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}