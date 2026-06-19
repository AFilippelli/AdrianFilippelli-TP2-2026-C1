import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {

    http = inject(HttpClient);

    listar() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get('http://localhost:3000/usuarios', { headers });
    }

    crear(usuario: any) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post('http://localhost:3000/usuarios', usuario, { headers });
    }

    deshabilitar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.delete(`http://localhost:3000/usuarios/${id}`, { headers });
    }

    habilitar(id: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.post(`http://localhost:3000/usuarios/${id}/habilitar`, {}, { headers });
    }
}