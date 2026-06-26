import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizar', standalone: true })
export class CapitalizarPipe implements PipeTransform {
    transform(valor: string): string {
        if(!valor) return '';
        return valor.split(' ')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
            .join(' ');
    }
}