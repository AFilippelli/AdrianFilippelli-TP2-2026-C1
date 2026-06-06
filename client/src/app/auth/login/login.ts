import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../auth.interfaces';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);

  router = inject(Router);

  formulario = new FormGroup({
      email: new FormControl("",
        [Validators.email, Validators.required]),
      password: new FormControl("",
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]),
  })



      enviar(){
        if(this.formulario.invalid) return;
        
        this.authService.ingresar(this.formulario.value as ILogin)
            .subscribe({
                next: (respuesta) => {
                    // si salió bien, redirigir al login
                    console.log(respuesta);
                    this.router.navigateByUrl('/publicaciones');
                },
                error: (error) => {
                    // si hubo error, mostrar mensaje
                    console.log(error);
                }
            });
      }

}
