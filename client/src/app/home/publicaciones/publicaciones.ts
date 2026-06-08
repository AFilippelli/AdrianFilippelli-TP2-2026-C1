import { Component, inject, OnInit, signal } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicaciones',
  imports: [FormsModule],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {

  publicacionesService = inject(PublicacionesService);

  publicaciones = signal<any[]>([]);

  nuevoTitulo = '';
  nuevoMensaje = '';

    ngOnInit(){
      this.publicacionesService.listar().subscribe({
          next: (respuesta: any) => {
              this.publicaciones.set(respuesta);
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

  crear(){
      if(!this.nuevoTitulo || !this.nuevoMensaje) return;
      
      const publicacion = {
          titulo: this.nuevoTitulo,
          mensaje: this.nuevoMensaje
      };

      this.publicacionesService.crear(publicacion).subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.nuevoTitulo = '';
              this.nuevoMensaje = '';
              this.ngOnInit();
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

  darMeGusta(id: string){
      this.publicacionesService.darMeGusta(id).subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.ngOnInit();
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

  quitarMeGusta(id: string){
      this.publicacionesService.quitarMeGusta(id).subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.ngOnInit();
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

  eliminar(id: string){
      this.publicacionesService.eliminar(id).subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.ngOnInit();
          },
          error: (error) => {
              console.log(error);
          }
      });
  }


}
