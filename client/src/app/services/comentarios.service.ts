import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    http = inject(HttpClient);

    traer(publicacionId: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/comentarios/${publicacionId}`, { headers });
    }

    agregar(publicacionId: string, mensaje: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`${environment.apiUrl}/comentarios/${publicacionId}`, { mensaje }, { headers });
    }

    modificar(comentarioId: string, mensaje: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.put(`${environment.apiUrl}/comentarios/${comentarioId}`, { mensaje }, { headers });
    }
}