/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
import {Word} from "../models/word";
import {Score} from "../models/score";
import {Observable} from "rxjs";
const {webkitSpeechRecognition} = (window as any);

//for avatar speech
declare let responsiveVoice: any;
const START_TEXT: string = "You are to say:   ";


@Component({
    selector: 'reading-area',
    styles: [
        require('./reading-area.scss'),
        require('../../common/anim.scss')
    ],
    template: require('./reading-area.html')
})


export class ReadingAreaComponent implements OnInit {
    //Current Words and paragraph to be displayed
    words: Observable<Word[]>;
    paragraph: onScreenSentence;

    //Related to Data to displayed on screen
    private buttonText: string;
    private buttonColor: string;
    bubble: boolean = false;

    //Current User score
    private score: Score;


    constructor(private readingService: ReadingService) {};


    ngOnInit(): void {
        //Initialize Button colors and text
        this.buttonText = 'Start';
        this.buttonColor = '#4279BD';

        this.score = this.readingService.retrieveScore(this.paragraph.getCurrentId());
        this.getOnScreenParagraph();
    }

    getOnScreenParagraph(): void {
        this.readingService.getOnScreenParagraph(this.paragraph.getCurrentId()).then(paragraph => {
            this.paragraph.setText(paragraph.getText());
        });
    }

    /**
     * Function for the
     * @param myString string to be said by the tutor
     */
    ReadSentenceToStudent(): void {
        if (!this.bubble) {
            this.bubble = true;
            responsiveVoice.speak(START_TEXT + this.paragraph.getText(), 'US English Female', {pitch: 1.32});
        }
        else {
            this.bubble = false;
        }
    }


}