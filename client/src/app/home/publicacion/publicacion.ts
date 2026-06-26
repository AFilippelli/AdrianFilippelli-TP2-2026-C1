import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionesService } from '../../services/publicaciones.service';
import { ComentariosService } from '../../services/comentarios.service';
import { FormsModule } from '@angular/forms';
import { TiempoTranscurridoPipe } from '../../pipes/tiempo-transcurrido.pipe';

@Component({
  selector: 'app-publicacion',
  imports: [FormsModule, TiempoTranscurridoPipe],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute); //id de la url
  publicacionesService = inject(PublicacionesService);
  comentariosService = inject(ComentariosService);

  publicacion = signal<any>(null);
  comentarios = signal<any[]>([]);
  comentarioEditandoId = signal<string | null>(null);
  usuarioActual: any = JSON.parse(localStorage.getItem('usuario') || '{}');


  nuevoComentario = '';   //guarda el texto del nuevo comentario
  mensajeEditado = '';

  ngOnInit() {
    const id = this.route.snapshot.params['id']; // obtengo el id de la URL
    
    this.publicacionesService.traerPorId(id).subscribe({
      next: (respuesta: any) => {
        this.publicacion.set(respuesta);
      },
      error: (error) => console.log(error)
    });

    this.comentariosService.traer(id).subscribe({
      next: (respuesta: any) => {
        this.comentarios.set(respuesta);
      },
      error: (error) => console.log(error)
    });
  }

  agregarComentario() {
    if(!this.nuevoComentario) return;
    const id = this.route.snapshot.params['id'];
    
    this.comentariosService.agregar(id, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.ngOnInit();
      },
      error: (error) => console.log(error)
    });
  }

  editarComentario(comentario: any) {
      this.comentarioEditandoId.set(comentario._id);
      this.mensajeEditado = comentario.mensaje;
  }

  esMiComentario(comentario: any): boolean {
      return this.usuarioActual._id === comentario.usuario;
  }

  guardarEdicion() {
      const id = this.comentarioEditandoId();
      if(!id || !this.mensajeEditado) return;

      this.comentariosService.modificar(id, this.mensajeEditado).subscribe({
          next: () => {
              this.comentarioEditandoId.set(null);
              this.mensajeEditado = '';
              this.ngOnInit();
          },
          error: (error) => console.log(error)
      });
  }

  cancelarEdicion() {
      this.comentarioEditandoId.set(null);
      this.mensajeEditado = '';
  }



}