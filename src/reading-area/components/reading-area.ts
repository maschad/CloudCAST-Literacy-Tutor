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
                const blob = new Blob(this.chunks, {'type': 'audio/wav; codecs=opus'});
                this.chunks.length = 0;
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'test.wav';
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a); 
                    window.URL.revokeObjectURL(url);
                }, 100);

            };

            this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
        };

        navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));

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
        this.download();
    }

    private  download(): void {

    }



}