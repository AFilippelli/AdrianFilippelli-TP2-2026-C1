import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion } from '../entities/publicacion.schema';
import { Comentario } from '../entities/comentario.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class EstadisticasService {

    constructor(
        @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
        @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
    ) {}

    async publicacionesPorUsuario(fechaInicio: Date, fechaFin: Date) {
        const resultado = await this.publicacionModel.aggregate([
            {
                $match: {
                    activa: true,
                    fecha: {
                        $gte: fechaInicio,
                        $lte: fechaFin,
                    }
                }
            },
            {
                $group: {
                    _id: '$usuario_publicacion',
                    cantidad: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'usuario'
                }
            },
            {
                $unwind: '$usuario'
            },
            {
                $project: {
                    nombre: '$usuario.nombre_de_usuario',
                    cantidad: 1
                }
            }
        ]);
        return resultado;
    }

    async comentariosPorPeriodo(fechaInicio: Date, fechaFin: Date) {
        const resultado = await this.comentarioModel.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: fechaInicio,
                        $lte: fechaFin,
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } },
                    cantidad: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        return resultado;
    }

    async comentariosPorPublicacion(fechaInicio: Date, fechaFin: Date) {
        const resultado = await this.comentarioModel.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: fechaInicio,
                        $lte: fechaFin,
                    }
                }
            },
            {
                $group: {
                    _id: '$publicacion',
                    cantidad: { $sum: 1 }
                }
            },
            {
                $sort: { cantidad: -1 }
            }
        ]);
        return resultado;
    }
}
