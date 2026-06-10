import { IsOptional, IsString } from "class-validator";

export class ComentarioDTO{

    @IsString()
    mensaje: string;

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