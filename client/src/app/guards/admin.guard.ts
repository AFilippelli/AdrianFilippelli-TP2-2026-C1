import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';

export const adminGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = localStorage.getItem('token');

    if(!token) {
        router.navigateByUrl('/login');
        return false;
    }

    return new Promise((resolve) => {
        authService.autorizar().subscribe({
            next: (respuesta: any) => {
                if(respuesta.perfil !== 'administrador') {
                    router.navigateByUrl('/publicaciones');
                    resolve(false);
                    return;
                }
                resolve(true);
            },
            error: () => {
                router.navigateByUrl('/login');
                resolve(false);
            }
        });
    });
};