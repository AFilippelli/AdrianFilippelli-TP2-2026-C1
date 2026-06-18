import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PublicacionesService {


    http = inject(HttpClient);

    listar(orden: string = 'fecha', offset: number = 0) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`http://localhost:3000/publicaciones?orden=${orden}&limit=5&offset=${offset}`, { headers });
    }

    crear(publicacion: any, imagen?: File) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const formData = new FormData();
        formData.append('titulo', publicacion.titulo);
        formData.append('mensaje', publicacion.mensaje);
        if(imagen) {
            formData.append('imagen', imagen);
        }
        return this.http.post('http://localhost:3000/publicaciones', formData, { headers });
    }

    eliminar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`http://localhost:3000/publicaciones/${id}`, { headers });
    }

    darMeGusta(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`http://localhost:3000/publicaciones/${id}/me-gusta`, {}, { headers });
    }

    quitarMeGusta(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`http://localhost:3000/publicaciones/${id}/me-gusta`, { headers });
    }

    traerPorId(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`http://localhost:3000/publicaciones/${id}`, { headers });
    }
}