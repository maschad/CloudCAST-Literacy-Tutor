/**
 * Created by carlos on 3/21/17.
 */

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import {Component, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ReadingService} from "../services/reading-service";


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'word',
    styles: [
        require('./word.scss')
    ],
    template: require('./word.html')
})

export class WordComponent {
    strikethrough: Observable<any>;

    constructor(public route: ActivatedRoute, public wordService: ReadingService) {
    }
}

