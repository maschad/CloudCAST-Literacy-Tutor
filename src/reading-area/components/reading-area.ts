/**
 * Created by carlos on 3/24/17.
 */

import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {Word, IWord} from "../models/word";
import {ReadingService} from "../services/reading-service";

@Component({
    selector: 'reading-area',
    template: require('./reading-area.html')
})


export class ReadingAreaComponent implements OnInit{
    private paragraph: string[];
    private words: Word[];
    private errorMessage : string;

    @Output() _sentenceUpdated = new EventEmitter(false);
    private sentences: IWord[];

    constructor(private readingService: ReadingService){
    }


    ngOnInit(): void {
        this.readParagraph();
    }

    readParagraph(): void {
        this.readingService.loadParagraph().subscribe(paragraph => this.paragraph = paragraph, error =>  this.errorMessage = <any>error);

    }

    readWord(file:any): Word {
        let title = '';
        let phonemes = [];
        this.readingService.readFromText(file);
        return new Word(title,phonemes);
    }

    addWord($event): void {
        this.readWord(event.target);
    }




}