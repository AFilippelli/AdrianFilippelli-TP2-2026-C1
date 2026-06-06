import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { Publicacion } from './entities/publicacion.schema';
import { PublicacionDTO } from './dto/publicacion.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('publicaciones')
export class PublicacionesController {

    constructor(private readonly publicacionesService: PublicacionesService) {}
    
    @Post("/")
    @UseGuards(TokenGuard)
    crearPublicacion(
        @Body() publicacion: PublicacionDTO,
        @Body("_idDelToken") _id: string
    ){
        return this.publicacionesService.crear(publicacion, _id);
    }

    @Get("/")
    @UseGuards(TokenGuard)
    ListarPublicaciones(){
        return this.publicacionesService.listar();
    }

    @Delete("/:id")
    @UseGuards(TokenGuard)
    eliminarPublicacion(
        @Param('id') id: string,
        @Body("_idDelToken") _idUsuario: string
    ){
        return this.publicacionesService.eliminar(id);
    }
    
    @Post("/:id/me-gusta")
    @UseGuards(TokenGuard)
    DarMeGusta(
        @Param('id') id: string,
        @Body("_idDelToken") _idUsuario: string
    ){
        return this.publicacionesService.darMeGusta(id, _idUsuario);
    }

    @Delete("/:id/me-gusta")
    @UseGuards(TokenGuard)
    quitarMeGusta(
        @Param('id') id: string,
        @Body("_idDelToken") _idUsuario: string
    ){
        return this.publicacionesService.quitarMeGusta(id, _idUsuario);
    }
    
}
