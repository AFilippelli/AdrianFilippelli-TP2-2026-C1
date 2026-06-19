import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';
import { Nav } from './home/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  authService = inject(AuthService);

  mostrarModalSesion = signal(false);
  intervaloSesion: any = null;

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
    }, 10 * 60 * 1000); // 10 minutos
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
    this.authService.cerrarSesion();
    this.mostrarModalSesion.set(false);
    this.haySesion.set(false);
    if(this.intervaloSesion) clearTimeout(this.intervaloSesion);
  }
}