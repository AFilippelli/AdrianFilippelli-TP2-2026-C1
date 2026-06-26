import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { DatePipe } from '@angular/common';
import { CapitalizarPipe } from '../../pipes/capitalizar.pipe';

@Component({
  selector: 'app-mi-perfil',
  imports: [DatePipe, CapitalizarPipe],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {

  authService = inject(AuthService);

  datosUsuario = signal<any>(null);

  misPublicaciones = signal<any[]>([]);

    ngOnInit(){
      this.authService.obtenerPerfil().subscribe({
          next: (respuesta: any) => {
              this.datosUsuario.set(respuesta);
          },
          error: (error) => {
              console.log(error);
          }
      });

      this.authService.obtenerMisPublicaciones().subscribe({
          next: (respuesta: any) => {
              this.misPublicaciones.set(respuesta);
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

}
