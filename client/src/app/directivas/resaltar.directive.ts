import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appResaltar]',
    standalone: true
})
export class ResaltarDirective {
    constructor(private el: ElementRef) {}

    @HostListener('mouseenter')
    onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = 'var(--surface-dark)';
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = '';
    }
}