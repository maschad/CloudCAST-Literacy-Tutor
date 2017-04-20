/**
 * Created by carlos on 3/24/17.
 */

import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {Word, IWord} from "../models/word";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";

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
    private chunks: any = [];
    private mediaRecorder: any;
    private paragraph: onScreenSentence[];


    constructor(private readingService: ReadingService){
        const onSuccess = stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = e => {
                const audio = new Audio();
                const blob = new Blob(this.chunks, {'type': 'audio/ogg; codecs=opus'});
                this.chunks.length = 0;
                audio.src = window.URL.createObjectURL(blob);
                audio.load();
                audio.play();
            };
        };

        this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };


    ngOnInit(): void {
        this.getOnScreenSentences();
    }

    getOnScreenSentences() : void {
        this.readingService.getOnScreenSentences().then(paragraph => this.paragraph = paragraph);
    }

    start(): void {
        this.isRecording = true;
        this.mediaRecorder.start();

    }

    stop(): void {
        this.isRecording = false;
        this.mediaRecorder.stop();
    }



}