import { Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) { }


    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

