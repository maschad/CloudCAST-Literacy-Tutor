import {Directive, ElementRef, Input, HostBinding} from '@angular/core';

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) {}

    @Input() defaultColor: string;

    @Input('myHighlight') highlightColor: string;

    @HostBinding('highlight')
    private  highlight(color): string {
        return this.el.nativeElement.style.backgroundColor = color;
    }

}

