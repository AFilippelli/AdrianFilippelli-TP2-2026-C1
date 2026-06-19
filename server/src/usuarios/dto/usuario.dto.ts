//El DTO le habla al que hace la petición: "mandame los datos así"

import { IsDateString, isDateString, IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class UsuarioRegistroDTO{

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    nombre_de_usuario: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
    password: string;

    @IsString()
    @IsOptional()
    repetir_password: string;

    @IsDateString()
    fecha_nacimiento: Date;

    @IsString()
    @IsOptional()
    descripcion_breve: string;

    @IsString()
    @IsOptional()
    foto_perfil: string;

    @IsString()
    @IsOptional()
    perfil: string;

    @IsString()
    @IsOptional()
    emailDelToken: string;

    @IsString()
    @IsOptional()
    _idDelToken: string;
}

export class UsuarioLoginDTO{

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
    password: string;


}

export class TokenDTO {
    @IsString()
    @IsOptional()
    emailDelToken: string;

    @IsString()
    @IsOptional()
    _idDelToken: string;

    @IsString()
    @IsOptional()
    email: string;
}