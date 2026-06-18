import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const http = context.switchToHttp();
        const req: Request = http.getRequest();
        const authorization = req.headers.authorization;
        const token = authorization?.replace('Bearer ', '') || ''; //obtener el token

        try { //desencriptar el token
            const verificado = verify(token, process.env.CLAVE_SECRETA!) as any;

            // verifica que sea administrador
            if(verificado.perfil !== 'administrador') {
                throw new UnauthorizedException();
            }

            if(!req.body) {
                req.body = { emailDelToken: verificado.email, _idDelToken: verificado._id };
            } else {
                req.body.emailDelToken = verificado.email;
                req.body._idDelToken = verificado._id;
            }

            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}