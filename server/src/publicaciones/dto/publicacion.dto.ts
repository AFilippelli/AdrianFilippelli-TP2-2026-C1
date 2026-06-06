import { IsOptional, IsString } from "class-validator";

export class PublicacionDTO{

    @IsString()
    titulo: string;

    @IsString()
    mensaje: string;

    @IsString()
    @IsOptional()
    imagen: string;

    @IsString()
    @IsOptional()
    emailDelToken: string;

    @IsString()
    @IsOptional()
    _idDelToken: string;
}