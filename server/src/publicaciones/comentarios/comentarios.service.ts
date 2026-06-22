import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comentario } from '../entities/comentario.schema';
import { Model } from 'mongoose';
import { ComentarioDTO } from '../dto/comentario.dto';

@Injectable()
export class ComentariosService {

    constructor(
        @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
    ) {}

    async agregar(mensaje: ComentarioDTO, usuarioId: string, publicacionId: string){

        try{
            
            const agregarComentario = await this.comentarioModel.create({
                ...mensaje,
                usuario: usuarioId,
                publicacion: publicacionId,
                fecha: new Date(),
            });

            return agregarComentario;

        } catch{
            throw new UnauthorizedException();
        }

    }

    async traer(publicacionId: string){
        try{
            const traerComentarios = await this.comentarioModel
            .find({publicacion: publicacionId})
            .sort({fecha:-1})

            return traerComentarios;

        }catch{
            throw new UnauthorizedException();
        }
    }

    async modificar(comentarioId: string, nuevoMensaje: string, usuarioId: string){
        try{
            const comentario = await this.comentarioModel.findById(comentarioId);
            
            if(!comentario) {
                throw new UnauthorizedException();
            }

            if(comentario.usuario !== usuarioId) {
                throw new UnauthorizedException('No podés editar este comentario');
            }

            const modificado = await this.comentarioModel.updateOne(
                { _id: comentarioId },
                { mensaje: nuevoMensaje, modificado: true },
            );

            return modificado;
        } catch(error){
            throw error;
        }
    }
    
}
