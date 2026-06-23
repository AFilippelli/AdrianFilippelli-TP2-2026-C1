import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from 'jsonwebtoken';
import { Observable } from "rxjs";
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate{


  canActivate(
  context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


  const http = context.switchToHttp();

  const req: Request = http.getRequest();

  const authorization = req.headers.authorization;

  const token = authorization?.replace('Bearer ', '') || '';




    try {
      const verificado = verify(token, process.env.CLAVE_SECRETA!) as any;// Toma el encabezado, toma el payload, toma la CLAVESUPERSECRETA. Sigue todo el paso a paso para generar la firma. Si coincide con la del tóken enviado, es válido.

      const { email, _id } = verificado as { email: string, _id: string };

      // ¿Cómo le paso el email al controller?

      if (!req.body) {
        req.body = { email, _idDelToken: _id };
      } else {
        req.body.emailDelToken = email;
        req.body._idDelToken = _id;
        (req as any).usuarioId = verificado._id;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  
  }
}
