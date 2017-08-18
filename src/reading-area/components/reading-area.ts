/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit, ViewChild} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
import {WordVM} from "../models/wordVM";
import * as RecordRTC from 'recordrtc';
import {IScore} from "../models/score";
import {Observable} from "rxjs";
import {FirebaseObjectObservable} from "angularfire2";
import { IUser} from "../../shared/User";
import {LAST_READ_PARAGRAPH_ID} from "./UserActions";
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
    words: WordVM[];
    paragraph: onScreenSentence;
    userProfile$: FirebaseObjectObservable<IUser>;
    user$: firebase.User;

    //Related to Data to displayed on screen
    private buttonText: string;
    private buttonColor: string;
    bubble: boolean = false;

    //Streaming data
    private stream: MediaStream;
    private recordRTC: any;
    @ViewChild('audio') audio;


    constructor(private readingService: ReadingService) {};


    ngOnInit(): void {
        //Initialize Button colors and text
        this.buttonText = 'Start';
        this.buttonColor = '#4279BD';

        //Load the user
        this.loadUser();
        //Load User profile
        this.loadUserProfile();

        //Load the paragraph
        this.getOnScreenParagraph();
    }

    /**
     * Load the current user Profile
     */

    loadUserProfile(): void {
        this.userProfile$ = this.readingService.loadUserProfile();
        console.log('user profile', this.userProfile$);

    }

    /**
     * Load User
     */
    loadUser(): void {
        this.user$ = this.readingService.loadUser();
    }

    /**
     * Load the latest paragraph to be read by the user, if it is the first time it is set to paragraph 1.
     */

    getOnScreenParagraph(): void {
        this.readingService
            .getIndex(LAST_READ_PARAGRAPH_ID)
            .subscribe(
                lastParagraphId => {
                    this.readingService
                        .getLastReadParagraph(lastParagraphId.$value)
                        .then(paragraph => {
                            this.paragraph = paragraph;
                            this.createWords();
                        });
                }
            );
    }

    /**
     * Function to load the words onto the screen
     */
    createWords(): void {
        this.words = [];
        let titles = this.paragraph.text.split(' ');
        for(let title of titles){
            this.words.push(new WordVM(title,['']));
        }
    }


    /**
     * Function for the
     * @param myString string to be said by the tutor
     */
    ReadSentenceToStudent(): void {
        if (!this.bubble) {
            this.bubble = true;
            responsiveVoice.speak(START_TEXT + this.paragraph.text, 'US English Female', {pitch: 1.32});
        }
        else {
            this.bubble = false;
        }
    }

    /**
     * Accept user recording
     */
    startRecording(): any {
        let mediaConstraints = {
            audio: true
        };
        navigator
            .mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this),
                this.errorCallback.bind(this)
            );


    }

    /**
     * Recording helper functions
     */
    successCallback(stream: MediaStream) {
        let options = {
            mimeType: 'audio/mpeg', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
            audioBitsPerSecond: 128000
        };
        this.stream = stream;
        let recordRTC = RecordRTC(stream, options);
        recordRTC.startRecording();
        let audio: HTMLAudioElement = this.audio.nativeElement;
        audio.src = window.URL.createObjectURL(stream);

    }

    errorCallback() {
        //##TODO:handle error here
    }

    /**
     * Stop Recording input
     */
    stopRecording() {
        let recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processVideo.bind(this));
        let stream = this.stream;
        stream.getAudioTracks().forEach(track => track.stop());
    }

    /**
     *
     * Process the audio
     * @param audioVideoWebMURL
     */

    processVideo(audioURL) {
        let audio: any = this.audio.nativeElement;
        let recordRTC = this.recordRTC;
        audio.src = audioURL;
        let recordedBlob = recordRTC.getBlob();
        recordRTC.getDataURL(function (dataURL) { });
    }

    /**
     * Download the audio to send to the server
     */
    download() {
        this.recordRTC.save('speech.mp3');
    }

}