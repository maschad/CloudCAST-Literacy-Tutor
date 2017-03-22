/**
 * Created by carlos on 3/21/17.
 */


import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {IWord, Word} from '../models/word';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        require('./sentence.scss')
    ],
    template: require('./sentence.html')
})

export class SentenceComponent {
    strikethrough: boolean;
    @Input() words: IWord[];
    @Output() remove = new EventEmitter(false);
    @Output() update = new EventEmitter(false);

    addWord(word: Word): void {
        this.words.push(word);
    }

    completeSentence(): void {
       this.strikethrough = true;
    }

}