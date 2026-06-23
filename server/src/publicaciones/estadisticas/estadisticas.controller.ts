import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('estadisticas')
export class EstadisticasController {

    constructor(private readonly estadisticasService: EstadisticasService) {}

    @Get('/publicaciones-por-usuario')
    @UseGuards(TokenGuard)
    publicacionesPorUsuario(
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.estadisticasService.publicacionesPorUsuario(
            new Date(fechaInicio),
            new Date(fechaFin)
        );
    }

    @Get('/comentarios-por-periodo')
    @UseGuards(AdminGuard)
    comentariosPorPeriodo(
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.estadisticasService.comentariosPorPeriodo(
            new Date(fechaInicio),
            new Date(fechaFin)
        );
    }

    @Get('/comentarios-por-publicacion')
    @UseGuards(AdminGuard)
    comentariosPorPublicacion(
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.estadisticasService.comentariosPorPublicacion(
            new Date(fechaInicio),
            new Date(fechaFin)
        );
    }
}