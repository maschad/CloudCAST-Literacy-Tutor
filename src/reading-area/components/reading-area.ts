/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
const {webkitSpeechRecognition} = (window as any);

//For recording Audio
declare const navigator: any;
declare const MediaRecorder: any;


@Component({
    selector: 'reading-area',
    styles : [
        require('./reading-area.scss')
    ],
    template: require('./reading-area.html')
})


export class ReadingAreaComponent implements OnInit{
    public isRecording: boolean = false;
    private erroneousIndices: number[];
    private paragraph: onScreenSentence;


    constructor(private readingService: ReadingService){
        this.paragraph = new onScreenSentence(1, '');
        this.erroneousIndices = [];
    };


    ngOnInit(): void {
        this.getOnScreenParagraph();
    }

    getOnScreenSentences() : void {
        //this.readingService.getOnScreenSentences().then(paragraph => this.paragraph = paragraph);
    }

    getOnScreenParagraph() : void {
        this.readingService.getOnScreenParagraph(this.paragraph.getCurrentId()).then(paragraph => this.paragraph = paragraph);
        this.paragraph.incrementId();
        this.addWords();
    }

    addWords() : void {

    }


    compareTranscript (transcript: string) : void {
        let text = this.paragraph.text.split(' ');
        let splitTranscript = transcript.split(' ');


        for(let index in splitTranscript) {
            if(text[index].toLowerCase() != splitTranscript[index].toLowerCase()){
                console.log('text at index', index, 'is', text[index]);
                console.log('transcript text at index', index, 'is', splitTranscript[index]);
                this.erroneousIndices.push(+index);
            }
        }
        console.log('erroneous indices', this.erroneousIndices);

    }

    startConverting() {
        let finalTranscripts = '';
        let component = this;
        if ('webkitSpeechRecognition' in window) {
            let speechRecognizer = new webkitSpeechRecognition();
            speechRecognizer.continuous = false;
            speechRecognizer.interimResults = false;
            speechRecognizer.lang = 'en-GB';
            speechRecognizer.start();
            speechRecognizer.onresult = function (event) {
                let interimTranscripts = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    let transcript = event.results[i][0].transcript;
                    transcript.replace("\n", "<br>");
                    if (event.results[i].isFinal) {
                        finalTranscripts += transcript;
                    } else {
                        interimTranscripts += transcript;
                    }

                }
                component.compareTranscript(finalTranscripts);

            };

            speechRecognizer.onerror = function (event) {
                console.log('error')
            };
        } else {
            console.log('Your browser is not supported. If google chrome, please upgrade!');
        }

    }



}