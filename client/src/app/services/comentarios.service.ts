import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    http = inject(HttpClient);

    traer(publicacionId: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`http://localhost:3000/comentarios/${publicacionId}`, { headers });
    }

    agregar(publicacionId: string, mensaje: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`http://localhost:3000/comentarios/${publicacionId}`, { mensaje }, { headers });
    }

    modificar(comentarioId: string, mensaje: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.put(`http://localhost:3000/comentarios/${comentarioId}`, { mensaje }, { headers });
    }
}