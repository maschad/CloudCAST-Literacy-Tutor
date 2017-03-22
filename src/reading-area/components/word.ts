/**
 * Created by carlos on 3/21/17.
 */

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ReadingService} from "../services/reading-service";


@Component({
    template: require('./word.html')
})

export class WordComponent {
    strikethrough: Observable<any>;

    constructor(public route: ActivatedRoute, public wordService: ReadingService) {
        this.strikethrough = route.params.pluck('completed').do((value:string) => ReadingService.readWord())
    }
}

