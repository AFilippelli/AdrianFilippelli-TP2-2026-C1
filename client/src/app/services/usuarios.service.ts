import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {

    http = inject(HttpClient);

    listar() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/usuarios`, { headers });
    }

    crear(usuario: any) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`${environment.apiUrl}/usuarios`, usuario, { headers });
    }

    deshabilitar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`${environment.apiUrl}/usuarios/${id}`, { headers });
    }

    habilitar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`${environment.apiUrl}/usuarios/${id}/habilitar`, {}, { headers });
    }
}