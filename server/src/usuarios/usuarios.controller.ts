import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { TokenDTO, UsuarioRegistroDTO } from './dto/usuario.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService) {}


    @Get("/")
    @UseGuards(AdminGuard)
    listarUsuarios(
        @Body() _tokenData: TokenDTO,
    ) {
        return this.usuariosService.listar();
    }

    @Post("/")
    @UseGuards(AdminGuard)
    crearUsuario(
        @Body() usuario: UsuarioRegistroDTO,
    ){
        return this.usuariosService.crear(usuario);
    }

    @Delete("/:id")
    @UseGuards(AdminGuard)
    deshabilitarUsuario(
        @Param('id') id: string,
        @Body("_idDelToken") _idUsuario: string
    ){
        return this.usuariosService.deshabilitar(id);
    }

    @Post("/:id/habilitar")
    @UseGuards(AdminGuard)
    habilitarUsuario(
        @Param('id') id: string,
        @Body("_idDelToken") _idUsuario: string      
    ){
        return this.usuariosService.habilitar(id);
    }
    
}
