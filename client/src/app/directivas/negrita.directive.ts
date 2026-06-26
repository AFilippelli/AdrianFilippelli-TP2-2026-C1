import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNegrita]',
    standalone: true
})
export class NegritaDirective {
    private activo = false;

    constructor(private el: ElementRef) {}

    @HostListener('click')
    onClick() {
        this.activo = !this.activo;
        this.el.nativeElement.style.fontWeight = this.activo ? 'bold' : 'normal';
    }
}