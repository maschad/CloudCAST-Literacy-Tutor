/**
 * Created by carlos on 3/24/17.
 */

import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {Word, IWord} from "../models/word";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";

@Component({
    selector: 'reading-area',
    styles : [
        require('./reading-area.scss')
    ],
    template: require('./reading-area.html')
})


export class ReadingAreaComponent implements OnInit{
    private paragraph: onScreenSentence[];
    private words: Word[];
    private errorMessage : string;


    constructor(private readingService: ReadingService){
    }


    ngOnInit(): void {
        this.getOnScreenSentences();
    }

    getOnScreenSentences() : void {
        this.readingService.getOnScreenSentences().then(paragraph => this.paragraph = paragraph);
    }




}