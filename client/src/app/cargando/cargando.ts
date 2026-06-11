import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargando',
  imports: [],
  templateUrl: './cargando.html',
  styleUrl: './cargando.css',
})
export class Cargando {

  authService = inject(AuthService);

  router = inject(Router);

  ngOnInit(){
    this.authService.autorizar().subscribe({
        next: (respuesta: any) => {
            this.router.navigateByUrl('/publicaciones');
        },
        error: (error) => {
            this.router.navigateByUrl('/login');
        }
    });

  }

}
