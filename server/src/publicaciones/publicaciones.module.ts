import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './entities/publicacion.schema';
import { AutenticacionController } from 'src/autenticacion/autenticacion.controller';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Publicacion.name, schema: PublicacionSchema}])
      ],
      controllers: [PublicacionesController],
      providers: [PublicacionesService]
})
export class PublicacionesModule {

}
