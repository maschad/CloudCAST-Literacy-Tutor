/**
 * Created by carlos on 3/24/17.
 */

import {Component, Output, EventEmitter} from "@angular/core";
import {Word, IWord} from "../models/word";
import {ReadingService} from "../services/reading-service";

@Component({
    selector: 'reading-area',
    template: require('./reading-area.html')
})


export class ReadingAreaComponent {

    @Output() _sentenceUpdated = new EventEmitter(false);
    private sentences: IWord[];

    constructor(private readingService: ReadingService){
    }

    addWord($event): void {
        this.readWord(event.target);
    }

    readWord(file:any): Word {
        let title = '';
        let phonemes = [];
        this.readingService.readFromText(file);
        let word = new Word(title,phonemes);
        return word;
    }


}