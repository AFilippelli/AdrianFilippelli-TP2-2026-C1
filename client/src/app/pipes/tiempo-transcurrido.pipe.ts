import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tiempoTranscurrido', standalone: true })
export class TiempoTranscurridoPipe implements PipeTransform {
    transform(fecha: Date | string): string {
        if(!fecha) return '';
        const ahora = new Date();
        const entonces = new Date(fecha);
        const diferencia = ahora.getTime() - entonces.getTime();
        
        const minutos = Math.floor(diferencia / 60000);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if(dias > 0) return `hace ${dias} día${dias > 1 ? 's' : ''}`;
        if(horas > 0) return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
        if(minutos > 0) return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        return 'hace un momento';
    }
}