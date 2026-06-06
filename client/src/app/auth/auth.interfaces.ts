export interface IRegistro {
  nombre: string;
  apellido: string;
  email: string;
  nombre_usuario: string;
  password: string;
  fecha_nacimiento: string;
  descripcion?: string;
  foto_perfil?: string;
}

export interface ILogin{
    email: string;
    password: string;
}