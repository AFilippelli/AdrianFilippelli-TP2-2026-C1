import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  authService = inject(AuthService);

  mostrarModalSesion = signal(false);
  intervaloSesion: any = null;

  ngOnInit() {
    this.authService.iniciarContador$.subscribe(() => {
      this.iniciarContador();
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
    localStorage.removeItem('token');
    this.mostrarModalSesion.set(false);
    if(this.intervaloSesion) clearTimeout(this.intervaloSesion);
  }
}