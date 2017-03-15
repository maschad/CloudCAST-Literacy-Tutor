/**
 * Created by carlos on 3/11/17.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
    changeDetection: ChangeDetectionStrategy.onPush,
    selector: 'paragraph-form',
    styles: [
        require('./paragraph-form.scss')
    ]
})