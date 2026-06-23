import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService {

    http = inject(HttpClient);

    publicacionesPorUsuario(fechaInicio: string, fechaFin: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/estadisticas/publicaciones-por-usuario?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { headers });
    }

    comentariosPorPeriodo(fechaInicio: string, fechaFin: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/estadisticas/comentarios-por-periodo?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { headers });
    }

    comentariosPorPublicacion(fechaInicio: string, fechaFin: string) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/estadisticas/comentarios-por-publicacion?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { headers });
    }
}