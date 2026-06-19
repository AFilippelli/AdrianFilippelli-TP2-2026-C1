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

  esAdministrador(): boolean {
    const datos = this.authService.obtenerDatosToken();
    return datos?.perfil === 'administrador';
  }

  irAPublicaciones() {
    this.router.navigateByUrl('/publicaciones');
  }

  irAMiPerfil() {
    this.router.navigateByUrl('/mi-perfil');
  }

  irAUsuarios() {
    this.router.navigateByUrl('/dashboard/usuarios');
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}