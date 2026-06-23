import { Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionDTO } from './dto/publicacion.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { TokenDTO } from 'src/usuarios/dto/usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudinary } from 'src/cloudinary.config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tp2-publicaciones',
    } as any,
});

@Controller('publicaciones')
export class PublicacionesController {

    constructor(private readonly publicacionesService: PublicacionesService) {}
    
    @Post("/")
    @UseGuards(TokenGuard)
    @UseInterceptors(FileInterceptor('imagen', { storage }))
    crearPublicacion(
        @Body() publicacion: PublicacionDTO,
        @Body("_idDelToken") _id: string,
        @UploadedFile() imagen: Express.Multer.File,
        @Req() req: any
    ) {
        const usuarioId = req.body._idDelToken || _id;
        return this.publicacionesService.crear(publicacion, usuarioId, imagen);
    }

    @Get("/")
    @UseGuards(TokenGuard)
    listarPublicaciones(
        @Body() _tokenData: TokenDTO,
        @Query('orden') orden: string = 'fecha',
        @Query('limit') limit: number = 5,
        @Query('offset') offset: number = 0,
    ) {
        return this.publicacionesService.listar(orden, Number(limit), Number(offset));
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
    darMeGusta(
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

    @Get('/mis-publicaciones')
    @UseGuards(TokenGuard)
    listarMisPublicaciones(@Body() _tokenData: TokenDTO, @Body('_idDelToken') _id: string) {
        return this.publicacionesService.listarPorUsuario(_id);
    }

    @Get('/:id')
    @UseGuards(TokenGuard)
    traerPorId(
        @Param('id') id: string,
        @Body() _tokenData: TokenDTO
    ) {
        return this.publicacionesService.traerPorId(id);
    }
}