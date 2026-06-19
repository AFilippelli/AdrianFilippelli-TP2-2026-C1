import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-usuarios.html',
  styleUrl: './dashboard-usuarios.css',
})
export class DashboardUsuarios implements OnInit {

    usuariosService = inject(UsuariosService);

    usuarios = signal<any[]>([]);

    mostrarModal = signal(false);
    mensajeError = signal("");

    mostrarFormulario = signal(false);

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
      perfil: new FormControl("usuario", [Validators.required]),
    }, { validators: this.passwordsCoinciden });

    ngOnInit(){
        this.cargarUsuarios();
    }

    cargarUsuarios(){
        this.usuariosService.listar().subscribe({
            next: (respuesta: any) => {
                this.usuarios.set(respuesta);
            },
            error: (error) => console.log(error)
        });
    }

    abrirFormulario(){
        this.mostrarFormulario.set(true);
    }

    cerrarFormulario(){
        this.mostrarFormulario.set(false);
        this.formulario.reset({ perfil: 'usuario' });
    }

  crearUsuario(){
      if(this.formulario.invalid) return;

      this.usuariosService.crear(this.formulario.value).subscribe({
          next: () => {
              this.cerrarFormulario();
              this.cargarUsuarios();
          },
          error: (error) => {
              const mensaje = error?.error?.message;
              this.mensajeError.set(Array.isArray(mensaje) ? mensaje.join(' / ') : (mensaje || 'No se pudo crear el usuario'));
              this.mostrarModal.set(true);
          }
      });
  }

    deshabilitar(id: string){
        this.usuariosService.deshabilitar(id).subscribe({
            next: () => this.cargarUsuarios(),
            error: (error) => console.log(error)
        });
    }

    habilitar(id: string){
        this.usuariosService.habilitar(id).subscribe({
            next: () => this.cargarUsuarios(),
            error: (error) => console.log(error)
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