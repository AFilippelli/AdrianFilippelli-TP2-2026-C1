import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { TokenGuard } from 'src/guards/token.guard';
import { ComentarioDTO } from '../dto/comentario.dto';

@Controller('comentarios')
export class ComentariosController {

    constructor(private readonly comentariosService: ComentariosService) {}

    @Post("/:publicacionId")
    @UseGuards(TokenGuard)
    agregarComentario(
        @Body() mensaje: ComentarioDTO,
        @Body("_idDelToken") _id: string,
        @Param("publicacionId") publicacionId: string,

    ){

        return this.comentariosService.agregar(mensaje, _id, publicacionId);
    }

    @Get("/:publicacionId")
    @UseGuards(TokenGuard)
    traerComentarios(
        @Param("publicacionId") publicacionId: string,
    ){
        return this.comentariosService.traer(publicacionId);
    }

    @Put("/:comentarioId")
    @UseGuards(TokenGuard)
    modificarComentario(
        @Param("comentarioId") comentarioId: string,
        @Body("mensaje") nuevoMensaje: string,
    ){
        return this.comentariosService.modificar(comentarioId, nuevoMensaje);
    }

}
