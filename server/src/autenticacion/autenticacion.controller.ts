import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsuarioLoginDTO, UsuarioRegistroDTO } from 'src/usuarios/dto/usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  /*
  @Get('/seguro')
  @UseGuards(TokenGuard)
  rutaSegura(@Body('emailDelToken') email: any) {
    console.log(email);
    // SOLO Voy a poder acceder si tengo unt tóken válido

    return { mensaje: 'Acceso otorgado a ' + email };
  }
    */
}
