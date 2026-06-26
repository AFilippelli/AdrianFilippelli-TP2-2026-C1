import { Component, inject, OnInit, signal } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CapitalizarPipe } from '../../pipes/capitalizar.pipe';
import { TruncarPipe } from '../../pipes/truncar.pipe';
import { TiempoTranscurridoPipe } from '../../pipes/tiempo-transcurrido.pipe';
import { ResaltarDirective } from '../../directivas/resaltar.directive';
import { NegritaDirective } from '../../directivas/negrita.directive';

@Component({
  selector: 'app-publicaciones',
  imports: [FormsModule, CapitalizarPipe, TruncarPipe, TiempoTranscurridoPipe,
    ResaltarDirective, NegritaDirective
  ],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {

  publicacionesService = inject(PublicacionesService);
  router = inject(Router);

  publicaciones = signal<any[]>([]);
  nuevoTitulo = '';
  nuevoMensaje = '';
  orden = 'fecha';
  offset = 0;
  hayMas = signal(true);

  imagenSeleccionada: File | null = null;

  usuarioActual: any = JSON.parse(localStorage.getItem('usuario') || '{}');

  ngOnInit(){
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
      this.offset = 0;
      this.publicacionesService.listar(this.orden, this.offset).subscribe({
          next: (respuesta: any) => {
              this.publicaciones.set(respuesta);
              this.hayMas.set(respuesta.length === 5);
          },
          error: (error) => console.log(error)
      });
  }

  verMas() {
      this.offset += 5;
      this.publicacionesService.listar(this.orden, this.offset).subscribe({
          next: (respuesta: any) => {
              this.publicaciones.update(anterior => [...anterior, ...respuesta]);
              this.hayMas.set(respuesta.length === 5);
          },
          error: (error) => console.log(error)
      });
  }

  cambiarOrden(nuevoOrden: string) {
    this.orden = nuevoOrden;
    this.cargarPublicaciones();
  }

  crear(){
      if(!this.nuevoTitulo || !this.nuevoMensaje) return;
      
      const publicacion = {
          titulo: this.nuevoTitulo,
          mensaje: this.nuevoMensaje
      };

      this.publicacionesService.crear(publicacion, this.imagenSeleccionada ?? undefined).subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.nuevoTitulo = '';
              this.nuevoMensaje = '';
              this.imagenSeleccionada = null;
              this.cargarPublicaciones();
          },
          error: (error) => console.log(error)
      });
  }
  
  /*
  darMeGusta(id: string){
    this.publicacionesService.darMeGusta(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.cargarPublicaciones();
      },
      error: (error) => console.log(error)
    });
  }*/

  yaDioMeGusta(publicacion: any): boolean {
      return publicacion.me_gusta.includes(this.usuarioActual._id);
  }

  toggleMeGusta(publicacion: any){
      const accion = this.yaDioMeGusta(publicacion)
          ? this.publicacionesService.quitarMeGusta(publicacion._id)
          : this.publicacionesService.darMeGusta(publicacion._id);

      accion.subscribe({
          next: (respuesta) => {
              console.log(respuesta);
              this.cargarPublicaciones();
          },
          error: (error) => console.log(error)
      });
  }

  /*
  quitarMeGusta(id: string){
    this.publicacionesService.quitarMeGusta(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.cargarPublicaciones();
      },
      error: (error) => console.log(error)
    });
  }*/

  eliminar(id: string){
    this.publicacionesService.eliminar(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.cargarPublicaciones();
      },
      error: (error) => console.log(error)
    });
  }

  puedeEliminar(publicacion: any): boolean {
      return this.usuarioActual._id === publicacion.usuario_publicacion || 
            this.usuarioActual.perfil === 'administrador';
  }

  verPublicacion(id: string) {
    this.router.navigateByUrl(`/publicacion/${id}`);
  }


  onImagenSeleccionada(event: any) {
      this.imagenSeleccionada = event.target.files[0];
  }



}