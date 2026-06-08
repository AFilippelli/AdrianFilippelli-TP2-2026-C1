import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PublicacionesService {


    http = inject(HttpClient);

    listar(){
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

        return this.http.get("http://localhost:3000/publicaciones", {headers});
    }

    crear(publicacion: any) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post('http://localhost:3000/publicaciones', publicacion, { headers });
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
}