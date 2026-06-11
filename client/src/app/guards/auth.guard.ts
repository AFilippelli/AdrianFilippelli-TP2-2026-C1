import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    const token = localStorage.getItem('token');
    
    if(!token) {
        router.navigateByUrl('/login');
        return false;
    }

    return new Promise((resolve) => {
        authService.autorizar().subscribe({
            next: () => resolve(true),
            error: () => {
                router.navigateByUrl('/login');
                resolve(false);
            }
        });
    });
};