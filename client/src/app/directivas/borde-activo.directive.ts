import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appBordeActivo]',
    standalone: true
})
export class BorderActivoDirective {
    constructor(private el: ElementRef) {}

    @HostListener('focus')
    onFocus() {
        this.el.nativeElement.style.border = '2px solid var(--accent)';
        this.el.nativeElement.style.outline = 'none';
    }

    @HostListener('blur')
    onBlur() {
        this.el.nativeElement.style.border = '1px solid var(--border)';
    }
}