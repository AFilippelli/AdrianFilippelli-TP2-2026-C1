import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioLoginDTO, UsuarioRegistroDTO } from 'src/usuarios/dto/usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TokenGuard } from 'src/guards/token.guard';
import { TokenDTO } from 'src/usuarios/dto/usuario.dto';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(private readonly autenticacionService: AutenticacionService) {}

    @Post('/registro')
    @UseInterceptors(FileInterceptor('foto_perfil', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const nombreUnico = Date.now() + '-' + file.originalname;
                cb(null, nombreUnico);
            }
        })
    }))
    registrar(
        @Body() usuario: UsuarioRegistroDTO,
        @UploadedFile() foto: Express.Multer.File
    ) {
        return this.autenticacionService.registrar(usuario, foto);
    }

    @Post('/ingresar')
    ingresar(@Body() usuario: UsuarioLoginDTO) {
        return this.autenticacionService.ingresar(usuario);
    }
  
    @Get('/perfil')
    @UseGuards(TokenGuard)
    obtenerPerfil(@Body() _tokenData: TokenDTO, @Body('_idDelToken') _id: string) {
        return this.autenticacionService.obtenerPerfil(_id);
    }
}
