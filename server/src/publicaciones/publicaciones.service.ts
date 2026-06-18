import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.schema';
import { Model } from 'mongoose';
import { PublicacionDTO } from './dto/publicacion.dto';
import { Usuario } from 'src/usuarios/entities/usuario.schema';

@Injectable()
export class PublicacionesService {

    constructor(
        @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
    ) {}

    async crear(publicacion: PublicacionDTO, usuarioId: string, imagen?: Express.Multer.File){
        try{
            const urlImagen = imagen ? `http://localhost:3000/uploads/${imagen.filename}` : null;
            
            const publicacionCreada = await this.publicacionModel.create({
                ...publicacion,
                usuario_publicacion: usuarioId,
                imagen: urlImagen,
            });

            return publicacionCreada;
        } catch{
            throw new UnauthorizedException();
        }
    }

    async listar(orden: string, limit: number = 5, offset: number = 0) {
        try {
            const ordenamiento: Record<string, 1 | -1> = orden === 'me_gusta' 
                ? { me_gusta: -1 } 
                : { _id: -1 };
                
            const publicaciones = await this.publicacionModel
                .find({ activa: true })
                .sort(ordenamiento)
                .limit(limit)
                .skip(offset);
                
            return publicaciones;
        } catch {
            throw new UnauthorizedException();
        }
    }

    async listarPorUsuario(usuarioId: string) {
        try {
            const publicaciones = await this.publicacionModel
                .find({ usuario_publicacion: usuarioId, activa: true })
                .sort({ _id: -1 })
                .limit(3);
            return publicaciones;
        } catch {
            throw new UnauthorizedException();
        }
    }

    async eliminar(id: string){
        try{

            const publicacionBorrada = await this.publicacionModel.updateOne(
                {_id: id},
                {activa: false},
            );

            return publicacionBorrada;
        }catch{
            throw new UnauthorizedException();
        }
    }

    async darMeGusta(id: string, usuarioId: string){
        try{
            const publicacion = await this.publicacionModel.findById(id);
            
            if(publicacion?.me_gusta.includes(usuarioId)){
                throw new BadRequestException('Ya diste me gusta a esta publicación');
            }

            const nuevoMeGusta = await this.publicacionModel.updateOne(
                {_id: id},
                {$push: {me_gusta: usuarioId}},
            )

            return nuevoMeGusta;

        } catch(error){
            throw error;
        }
    }

    async quitarMeGusta(id:string, usuarioId: string){
        try{
            const quitarLike = await this.publicacionModel.updateOne(
                {_id:id},
                {$pull: {me_gusta:usuarioId}},
            )

            return quitarLike;

        }catch{
            throw new UnauthorizedException();
        }
    }

    async traerPorId(id: string) {
        try {
            const publicacion = await this.publicacionModel.findById(id);
            return publicacion;
        } catch {
            throw new UnauthorizedException();
        }
    }

}
