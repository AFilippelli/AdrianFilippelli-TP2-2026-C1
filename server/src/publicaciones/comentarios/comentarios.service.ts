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

        async modificar(comentarioId: string, nuevoMensaje: string){
            try{
                const modificarComentario = await this.comentarioModel.updateOne(
                    {_id: comentarioId},
                    {mensaje: nuevoMensaje, modificado: true},
                )

                return modificarComentario;
            }
            catch{
                throw new UnauthorizedException();
            }
        }
    
}
