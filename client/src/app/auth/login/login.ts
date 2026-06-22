import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../auth.interfaces';
import { NavAuth } from "../nav-auth/nav-auth";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NavAuth],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);

  router = inject(Router);

  mostrarModal = signal(false);
  mensajeError = signal("");

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
                  localStorage.setItem('token', respuesta);
                  const datos = this.authService.obtenerDatosToken();
                  localStorage.setItem('usuario', JSON.stringify(datos));
                  this.authService.iniciarContador$.next();
                  this.router.navigateByUrl('/publicaciones');
              },
              error: (error) => {
                  const mensaje = error?.error?.message;
                  this.mensajeError.set(mensaje || 'Email o contraseña incorrectos');
                  this.mostrarModal.set(true);
              }
          });
  }

  cerrarModal() {
      this.mostrarModal.set(false);
      this.mensajeError.set("");
  }

}
