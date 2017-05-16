import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) { }

    @Input() defaultColor: string;

    @Input('myHighlight') highlightColor: string;

    onColorThisWord() {
        this.highlight(this.highlightColor);
    }


    private highlight(color: string) {
        this.el.nativeElement.style.color = color;
    }
}

