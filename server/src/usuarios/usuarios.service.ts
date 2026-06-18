import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.schema';
import { Model } from 'mongoose';
import { UsuarioRegistroDTO } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

    constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    ) {}

    async listar(){
        try{
            const usuarios = await this.usuarioModel
                .find()
                .select("-password -contraseña");
        
            return usuarios;
        }catch{
           throw new UnauthorizedException(); 
        }
    }

    async crear(usuario: UsuarioRegistroDTO){
        try{
            const contraseñaEncriptada = await bcrypt.hash(usuario.password, 10);

            const usuarioCreado = await this.usuarioModel.create({
                ...usuario,
                password: contraseñaEncriptada,
            }) as any;

            return usuarioCreado;
        }catch{
            throw new UnauthorizedException();
        }
    }

    async deshabilitar(id: string){
        try{
            const usuarioEliminado = await this.usuarioModel.updateOne(
                {_id: id},
                {activo: false}
            )

            return usuarioEliminado;

        }catch{
            throw new UnauthorizedException();
        }
    }

    async habilitar(id: string){
        try{
            const usuarioHabilitado = await this.usuarioModel.updateOne(
                {_id: id},
                {activo: true}
            )

            return usuarioHabilitado;

        }catch{
            throw new UnauthorizedException();
        }
    }


}
