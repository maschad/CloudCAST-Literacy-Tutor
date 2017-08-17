/**
 * Created by carlos on 3/24/17.
 */

import {Component, OnInit} from "@angular/core";
import {ReadingService} from "../services/reading-service";
import {onScreenSentence} from "../models/onScreenSentence";
import {WordVM} from "../models/word";
import {IScore} from "../models/score";
import {Observable} from "rxjs";
import {FirebaseObjectObservable} from "angularfire2";
import {IUser} from "../../shared/User";
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
    words$: Observable<WordVM[]>;
    paragraph: onScreenSentence;
    userProfile$: FirebaseObjectObservable<IUser>;
    user$: firebase.User;

    //Related to Data to displayed on screen
    private buttonText: string;
    private buttonColor: string;
    bubble: boolean = false;

    //Current User score
    private $score: FirebaseObjectObservable<IScore>;


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
        this.userProfile$ = this.readingService.loadUserProfile()

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