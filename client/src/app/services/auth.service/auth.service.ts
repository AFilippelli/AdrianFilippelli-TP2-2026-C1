import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin, IRegistro } from '../../auth/auth.interfaces';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})


export class AuthService {

    http = inject(HttpClient);

    iniciarContador$ = new Subject<void>();

    registrar(datos: any, foto?: File) {
        const formData = new FormData();
        
        // agrego cada campo del formulario al FormData
        Object.keys(datos).forEach(key => {
            if(datos[key] !== null && datos[key] !== undefined) {
                formData.append(key, datos[key]);
            }
        });
        
        // si hay foto la agrego
        if(foto) {
            formData.append('foto_perfil', foto);
        }
        
        return this.http.post(`${environment.apiUrl}/autenticacion/registro`, formData, { responseType: 'text' });
    }  

    ingresar(datos: ILogin){
        return this.http.post(`${environment.apiUrl}/autenticacion/ingresar`, datos, { responseType: 'text' });
    }

    obtenerPerfil() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/autenticacion/perfil`, { headers });
    }

    obtenerMisPublicaciones() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${environment.apiUrl}/publicaciones/mis-publicaciones`, { headers });
    }

    autorizar() {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.post(`${environment.apiUrl}/autenticacion/autorizar`, { token }, { headers });
    }

    refrescar() {
        const token = localStorage.getItem('token');
        return this.http.post(`${environment.apiUrl}/autenticacion/refrescar`, { token }, { responseType: 'text' });
    }

    obtenerDatosToken() {
        const token = localStorage.getItem('token');
        if(!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    cerrarSesion() {
    localStorage.removeItem('token');
    }

}
