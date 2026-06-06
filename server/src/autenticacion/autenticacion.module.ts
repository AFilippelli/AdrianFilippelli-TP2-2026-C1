import { Module } from '@nestjs/common';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/usuarios/entities/usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Usuario.name, schema: UsuarioSchema}])
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService]
})
export class AutenticacionModule {}
