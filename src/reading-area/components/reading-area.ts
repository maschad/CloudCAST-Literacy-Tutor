/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
import {WordVM} from "../models/wordVM";
import { Score} from "../models/score";
import {FirebaseObjectObservable} from "angularfire2";
import { IUser} from "../../shared/User";
import {LAST_READ_PARAGRAPH_ID} from "./UserActions";
import {PhonemeVM} from "../models/phonemeVM";
import {Phoneme} from "../../shared/Phoneme";
import {KaldiResult} from "../../shared/kaldiResult";

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
    bubble: boolean = false;
    isRecording: boolean;

    //Kaldi Results to be compared to current word
    private kaldiResult$:KaldiResult;


    constructor(private readingService: ReadingService) {};


    ngOnInit(): void {

        //Subscribe to the result
        this.readingService.kaldiResult$.subscribe(
            kaldiResult => {
                this.kaldiResult$ = kaldiResult;
                console.log('this kaldi result', this.kaldiResult$);
                this.parsePhonemes();
            }
        );
        //Load the user
        this.loadUser();
        //Load User profile
        this.loadUserProfile();

        //Load the paragraph
        this.getOnScreenParagraph();

        //Set recording observable
        this.readingService.isRecording$.subscribe(
            isRecording => this.isRecording = isRecording
        )


    }

    /**
     * Load the current user Profile
     */

    loadUserProfile(): void {
        this.userProfile$ = this.readingService.loadUserProfile();

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
            this.readingService.getPhonemes(title.toLocaleLowerCase()).then(
                //Pass the phone mappings into each wordVM
                phoneMapping => {
                    let phonemes = [];
                    phoneMapping.phones.forEach(phone => phonemes.push(new PhonemeVM(phone)));
                    this.words.push(new WordVM(title,phonemes));
                }
            );
        }
        console.log('words', this.words);
    }



    /**
     * Function for the
     * @param myString string to be said by the tutor
     */
    ReadSentenceToStudent(): void {
        if (!this.bubble) {
            this.bubble = true;
            responsiveVoice.speak(START_TEXT + this.paragraph.text, 'UK English Female', {pitch: 0.7});
        }
        else {
            this.bubble = false;
        }
    }

    /**
     * Accept user recording
     */
    startRecording(): void {
        this.readingService.startListening();
    }

    /**
     * To stop accepting input
     */

    stopRecording(): void {
        this.readingService.stopListening();
    }

    /**
     * To parse the kaldi Result
     */
    parsePhonemes(){
        let nonSilencePhones = [];
        //#TODO: Test this, then update color

        //Clean up phones to exclude silence phones
        this.kaldiResult$.phonemes.forEach((phoneme) => {
           if(phoneme.phone != 'SIL'){
               console.log('phoneme', phoneme.phone);
                nonSilencePhones.push(phoneme);
           }
        });
        //Compare the non silence phones
        nonSilencePhones.forEach((phoneme) => {
            this.words.forEach(word => {
                word.comparePhones(phoneme);
                word.completeWord();
            })
        });
        this.checkUserStatus();
    }

    /**
     * update the confidence scores
     * @param {Phoneme[]} phonemes
     */
    updateConfidenceScore(phonemes: Phoneme[]){

        //#TODO: Iterate through the words array and assign the confidence scores received in order to update screen
        let score = new Score();

        phonemes.forEach(phoneme => {
            let confidence = phoneme.getConfidence();
            let label = phoneme;

            if(confidence < 0.7){
                score.updateScore(0,1);
            } else {
                score.updateScore(1,0);
            }

        });
        this.readingService.updateScore(score);
    }

    /**
     * Check to see if User would like re-try if incorrect, move on if correct
     */
    checkUserStatus(){
        let nextParagraph = true;
        this.words.forEach(word => {
            if(word.getColor() == 'red'){
                nextParagraph = false;
            }
        });
        if(nextParagraph)
            this.readingService.updateLastReadParagraph();
    }

}