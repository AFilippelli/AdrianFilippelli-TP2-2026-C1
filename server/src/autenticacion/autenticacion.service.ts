import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioLoginDTO, UsuarioRegistroDTO } from 'src/usuarios/dto/usuario.dto';
import { Usuario } from 'src/usuarios/entities/usuario.schema';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const DURACION_TOKEN = "2 minutes";

@Injectable()
export class AutenticacionService {


    constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    ) {}

    
    async registrar(usuario: UsuarioRegistroDTO, foto: Express.Multer.File){
        /*Tomar los datos que lleguen, crear o verificar
        que los datos sean validos
        Encriptar o hashear la contraseña
        Exito: genera token
        Error: Status 401 -> unauthorized*/
        try {
            const contraseñaEncriptada = await bcrypt.hash(usuario.password, 10);
            const urlFoto = foto ? foto.path : null;

            const usuarioCreado = await this.usuarioModel.create({
                ...usuario,
                password: contraseñaEncriptada,
                foto_perfil: urlFoto,
            }) as any;

            const payload = { //contenido del token
                email: usuarioCreado.email,
                _id: usuarioCreado._id,
                perfil: usuarioCreado.perfil, 
            };

            const jwt = sign(payload, process.env.CLAVE_SECRETA!, {
                algorithm: 'HS256',
                audience: 'registro',
                expiresIn: DURACION_TOKEN,
            });

            return jwt;
            
        } catch(error) {
            console.log(error);
            throw new UnauthorizedException();
        }
    }

    async ingresar(usuario: UsuarioLoginDTO) {
        try {
            const usuarioEncontrado = await this.usuarioModel.findOne({
                email: usuario.email,
            });

            if(!usuarioEncontrado)  {
                throw new Error();
            }

            // Comparamos la contraseña que llegó con la encriptada guardada
            const contraseñaValida = await bcrypt.compare(
                usuario.password,
                usuarioEncontrado.password
            );

            if(!usuarioEncontrado.activo) {
                throw new UnauthorizedException('Usuario deshabilitado');
            }

            if(!contraseñaValida){
                throw new Error();
            }

            const payload = { //contenido del token
                email: usuarioEncontrado.email,
                _id: usuarioEncontrado._id,
                perfil: usuarioEncontrado.perfil, 
            };

            const jwt = sign(payload, process.env.CLAVE_SECRETA!, {
                algorithm: "HS256",
                audience: "ingreso",
                expiresIn: DURACION_TOKEN,
                
            })

            return jwt;

        } catch(error) {
            if(error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException();
        }
    } 

    async obtenerPerfil(id: string) {
        try {
            const usuario = await this.usuarioModel.findById(id).select('-password');
            return usuario;
        } catch {
            throw new UnauthorizedException();
        }
    }

    async autorizar(token: string) {
        try {
            const verificado = verify(token, process.env.CLAVE_SECRETA!) as any;
            const usuario = await this.usuarioModel.findById(verificado._id).select('-password');
            return usuario;
        } catch {
            throw new UnauthorizedException();
        }
    }

    async refrescar(token: string) {
        try {
            const verificado = verify(token, process.env.CLAVE_SECRETA!) as any;
            
        const payload = {
            email: verificado.email,
            _id: verificado._id,
            perfil: verificado.perfil, 
        };

            const nuevoToken = sign(payload, process.env.CLAVE_SECRETA!, {
                algorithm: 'HS256',
                expiresIn: DURACION_TOKEN,
            });

            return nuevoToken;
        } catch {
            throw new UnauthorizedException();
        }
    }

    
}
