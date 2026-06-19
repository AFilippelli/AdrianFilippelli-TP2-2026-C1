import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})

export class PublicacionesService {

    http = inject(HttpClient);

    listar(orden: string = 'fecha', offset: number = 0) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/publicaciones?orden=${orden}&limit=5&offset=${offset}`, { headers });
    }

    crear(publicacion: any, imagen?: File) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        const formData = new FormData();
        formData.append('titulo', publicacion.titulo);
        formData.append('mensaje', publicacion.mensaje);
        if(imagen) {
            formData.append('imagen', imagen);
        }
        return this.http.post(`${environment.apiUrl}/publicaciones`, formData, { headers });
    }

    eliminar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`${environment.apiUrl}/publicaciones/${id}`, { headers });
    }

    darMeGusta(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`${environment.apiUrl}/publicaciones/${id}/me-gusta`, {}, { headers });
    }

    quitarMeGusta(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`${environment.apiUrl}/publicaciones/${id}/me-gusta`, { headers });
    }

    traerPorId(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/publicaciones/${id}`, { headers });
    }
}