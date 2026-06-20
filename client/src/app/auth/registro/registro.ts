import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { NavAuth } from "../nav-auth/nav-auth";

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, NavAuth],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

    authService = inject(AuthService);

    router = inject(Router);

    mostrarModal = signal(false);
    mensajeError = signal("");

    fotoSeleccionada: File | null = null;

    onFotoSeleccionada(event: any) {
        this.fotoSeleccionada = event.target.files[0];
    }


    formulario = new FormGroup({
      nombre: new FormControl("", 
        [Validators.minLength(3), Validators.maxLength(12), Validators.required]),
      apellido: new FormControl("", 
        [Validators.minLength(3), Validators.maxLength(15), Validators.required]),
      email: new FormControl("",
        [Validators.email, Validators.required]),
      nombre_de_usuario: new FormControl("", 
        [Validators.minLength(3), Validators.maxLength(15), Validators.required]),
      password: new FormControl("",
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]),
      repetir_password: new FormControl("", [Validators.required]), 
      fecha_nacimiento: new FormControl("", 
        [Validators.required]),
      descripcion_breve: new FormControl("", 
        [Validators.maxLength(200)]),
      foto_perfil: new FormControl<File | null>(null),
      perfil: new FormControl("usuario"),
    }, { validators: this.passwordsCoinciden });

    enviar(){
        if(this.formulario.invalid) return;
        
        this.authService.registrar(this.formulario.value, this.fotoSeleccionada ?? undefined)
            .subscribe({
                next: (respuesta) => {
                    localStorage.setItem('token', respuesta);
                    this.router.navigateByUrl('/login');
                },
                error: (error) => {
                    this.mensajeError.set("Ya existe un usuario con ese email o nombre de usuario");
                    this.mostrarModal.set(true);
                }
            });
    }

    cerrarModal() {
        this.mostrarModal.set(false);
        this.mensajeError.set("");
    }


    passwordsCoinciden(form: AbstractControl) {
        const password = form.get('password')?.value;
        const repetir = form.get('repetir_password')?.value;
        
        if(password !== repetir) {
            return { noCoinciden: true };
        }
        return null;
    }

}
