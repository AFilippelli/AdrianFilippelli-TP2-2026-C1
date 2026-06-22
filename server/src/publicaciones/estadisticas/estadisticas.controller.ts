import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('estadisticas')
export class EstadisticasController {

    constructor(private readonly estadisticasService: EstadisticasService) {}

    @Get('/publicaciones-por-usuario')
    @UseGuards(AdminGuard)
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