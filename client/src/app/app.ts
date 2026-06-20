import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';
import { Nav } from './home/nav/nav';


const DURACION_TOKEN_MS = 2 * 60 * 1000;    // 2 minutos en milisegundos
const AVISO_ANTES_MS = 1 * 60 * 1000;       // avisar 1 minuto antes

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  router = inject(Router);
  authService = inject(AuthService);

  mostrarModalSesion = signal(false);
  intervaloSesion: any = null;
      // avisar 1 minuto antes

  haySesion = signal(!!localStorage.getItem('token'));

  ngOnInit() {
    this.authService.iniciarContador$.subscribe(() => {
      this.iniciarContador();
      this.haySesion.set(true);
    });
  }

  iniciarContador() {
    if(this.intervaloSesion) clearTimeout(this.intervaloSesion);
    
    this.intervaloSesion = setTimeout(() => {
      this.mostrarModalSesion.set(true);
    }, DURACION_TOKEN_MS - AVISO_ANTES_MS);

      setTimeout(() => {
        if(this.mostrarModalSesion()) {
            this.cerrarSesion();
        }
    }, DURACION_TOKEN_MS);
  }

  extenderSesion() {
    this.authService.refrescar().subscribe({
      next: (nuevoToken) => {
        localStorage.setItem('token', nuevoToken);
        this.mostrarModalSesion.set(false);
        this.iniciarContador();
      },
      error: () => {
        this.cerrarSesion();
      }
    });
  }

  cerrarSesion() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.mostrarModalSesion.set(false);
      if(this.intervaloSesion) clearTimeout(this.intervaloSesion);
      this.haySesion.set(false);  
      this.router.navigateByUrl('/login');
  }
  
}