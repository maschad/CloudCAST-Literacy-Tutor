/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
import {Word} from "../models/word";
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
    private words: Word[];
    private erroneousWords: string[];
    private paragraph: onScreenSentence;


    constructor(private readingService: ReadingService){
        this.paragraph = new onScreenSentence(1, '');
        this.words = [];
        this.erroneousWords = [];
    };


    ngOnInit(): void {
        this.getOnScreenParagraph();
    }


    getOnScreenParagraph() : void {
        this.readingService.getOnScreenParagraph(this.paragraph.getCurrentId()).then(paragraph =>
        {
            this.paragraph.setText(paragraph.text);
            this.addWords();
            this.paragraph.incrementId();
        });

    }

    addWords() : void {
        let titles = this.paragraph.text.split(' ');
        for(let title of titles){
            this.words.push(new Word(title));
        }
    }

    updateWords(): void {
        console.log('updating words');
        for(let index in this.words){
            if(this.erroneousWords.indexOf(this.words[index].title) == -1){
                this.words[index].changeColor('green');
                console.log('word', this.words[index].title, 'color', this.words[index].color);
            } else {
                this.words[index].changeColor('red');
            }
        }
    }


    compareTranscript (transcript: string) : void {
        let text = this.paragraph.text.split(' ');
        let splitTranscript = transcript.split(' ');


        for(let index in splitTranscript) {
            if(text[index].toLowerCase() != splitTranscript[index].toLowerCase()){
                console.log('text at index', index, 'is', text[index]);
                console.log('transcript text at index', index, 'is', splitTranscript[index]);
                this.erroneousWords.push(splitTranscript[index]);
            }
        }
        console.log('erroneous words', this.erroneousWords);
        this.updateWords();

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