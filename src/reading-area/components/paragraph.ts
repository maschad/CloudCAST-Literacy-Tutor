/**
 * Created by carlos on 3/11/17.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'paragraph-form',
    styles: [
        require('./paragraph-form.scss')
    ]
})


export class ParagraphComponent {

}