import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './entities/publicacion.schema';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';
import { Comentario, ComentarioSchema } from './entities/comentario.schema';
import { ComentariosController } from './comentarios/comentarios.controller';
import { ComentariosService } from './comentarios/comentarios.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Publicacion.name, schema: PublicacionSchema},
            {name: Comentario.name, schema: ComentarioSchema}
         ])
      ],
      controllers: [PublicacionesController, ComentariosController],
      providers: [PublicacionesService, ComentariosService]
})
export class PublicacionesModule {

}
