
/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Headers, RequestOptions} from "@angular/http";
import {onScreenSentence} from "../models/onScreenSentence";
import {Score, IScore} from "../models/score";
import {IUser, User} from "../../shared/User";
import {LAST_READ_PARAGRAPH_ID, SCORE} from "../components/UserActions";
import {Observable} from "rxjs/Observable";
import {KaldiResult} from "../../shared/kaldiResult";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Modal} from "ngx-modialog/plugins/bootstrap";

declare const CloudCAST:any;
declare const pleaseWait:any;

@Injectable()
export class ReadingService {

    //JSON Headers and Options for HTTP requests
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    //In Memory API #TODO: Change when using actual server
    private sentencesUrl = 'api/onScreenSentences';
    private phonemeMappingUrl = 'api/phoneMapping';
    private cloudCASTUrl = 'https://this.cloudcast.sheffield.ac.uk/api/v0';
    //Kaldi Result Observable as is updated based on response
    public kaldiResult$: Subject<KaldiResult> = new Subject();
    //Recording behaviour subject
    private isRecording: BehaviorSubject<boolean> = new BehaviorSubject(false);
    //Observable recording stream
    public isRecording$: Observable<boolean>;
    //Cloudcast.js library var
    private cloudcast: any;
    //Loading screen
    private loadingScreen:any;


    //Firebase Variables
    private results$: FirebaseObjectObservable<IScore>;
    private users$: FirebaseObjectObservable<IUser>;
    private score$: FirebaseObjectObservable<IScore>;
    private userPath = `/users/${this.auth.id}`;
    private resultsPath = `/results/${this.auth.id}`;
    private weakWordsPath = `/weakwords/${this.auth.id}`;

    //#TODO:Temporary
    private lastReadParagraph:number;




    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http, public modal: Modal){
        //#TODO: Handle this better , assigning the self to make it accessible in the cloudcast scope
        let self = this;
        //Initialize Cloud cast Object
        this.cloudcast = new CloudCAST({
            recorderWorkerPath: '../../tutor/recorderWorker.js',
            username: 'foo',
            application: 'bar',
            onReady: function() {
                cloudcast.startListening();
                self.updateRecording(true);
            },
            onResult: function(result) {
                console.log('result', result);
                if(result.length > 1){
                    cloudcast.stopListening();
                    console.log('good');
                    self.updateKaldiResult(new KaldiResult(result[0].transcript,result[0]['phone-alignment'],result[0].likelihood,result[0]['word-alignment']));
                }else {
                    console.log('woops');
                    self.renderModal('It seems as if streaming stopped before a result was sent');
                }
            },
            onError: function(code, data) {
                console.log('Error %s: %s', code, data);
                self.updateRecording(false);
                self.stopLoading();
                cloudcast.cancel();
            },
            onEvent: function(code,data) {
                console.log('code', code, 'data', data);
                self.manageDecoding(code);
            }
        });
        //#TODO: Change decoder?
        this.cloudcast.decoder('tedlium');
        this.cloudcast.init();
        let cloudcast = this.cloudcast;
        this.isRecording$ = this.isRecording.asObservable();
    }

    /**
     * Load the user profile for various displays in front end
     * @returns {FirebaseObjectObservable<IUser>}
     */
    loadUserProfile(): FirebaseObjectObservable<IUser> {

        //#TODO: Clean up callback hell
        //if this is a first time user, we create a this.cloudcast and firebase account
        this.db.object(this.userPath).subscribe(
        user => {
            //If it's a first time user
            if(user.userData == undefined){
                    this.db.object(this.userPath).set({
                        userData :new User(this.auth.id)
                    });

            }


        });

        return this.db.object(this.userPath);
    }


    /**
     *Load the paragraph to be read
     * @param lastReadParagraphId
     * @returns {Promise<onScreenSentence>}
     */

    getLastReadParagraph(lastReadParagraphId:number): Promise<onScreenSentence> {
        //#TODO: Temporary
        this.lastReadParagraph = lastReadParagraphId;
        return this.http.get(this.sentencesUrl + '/' + lastReadParagraphId)
            .toPromise()
            .then(response => response.json().data as onScreenSentence)
            .catch(ReadingService.handleError);
    }

    /**
     * Update the last readParagraph
     */

    updateLastReadParagraph(): void {
        console.log('updating');
        //#TODO: When upgrading to angularFire2 v4 this will be far less cumbersome,
        // but that upgrade has too many breaking changes at the moment
        this.getIndex(LAST_READ_PARAGRAPH_ID).set(this.lastReadParagraph + 1);


    }

    /**
     * When a reader has finished a paragraph, we want to store that score in firebase
     * @param newScore
     */
    updateScore(newScore: Score): void {
        //#TODO: Eventually stop updating results and update users only
        this.getIndex(LAST_READ_PARAGRAPH_ID)
            .subscribe(
                lastParagraphId => {
                    this.results$ = this.db.object(this.resultsPath + `/${lastParagraphId.$value}`);
                    this.results$.set({score: newScore});
                    this.score$ = this.getIndex(SCORE);
                    this.score$.set({score:Score});
                    this.setHighestScore(newScore,lastParagraphId.$value)
                });

    }

    /**
     * Once that score has been completed we want to set it if it's the high score
     * @param score
     * @param lastParagraphId
     */
    setHighestScore(score:Score, lastParagraphId:number): void{
        this.getHighestScore(lastParagraphId).then(
            highScore => {
                if (score.totalCorrect > highScore) {
                    this.http.post(this.sentencesUrl + '/' + lastParagraphId, {highestScore: score}, this.options)
                        .toPromise()
                        .catch(ReadingService.handleError)
                }
            }
        );
    }


    getHighestScore(id:number): Promise<number>{
        return this.http.get(this.sentencesUrl + `/${id}`)
            .toPromise()
            .then(response => response.json().data as number)
            .catch(ReadingService.handleError)
    }

    /**
     * Retrieve a score for a current score
     * @param id
     * @returns {FirebaseObjectObservable<any>}
     */
    retrieveScore(id:number): FirebaseObjectObservable<IScore> {
        return this.db.object(this.resultsPath + `/${id}`);
    }

    /**
     * Begin streaming audio to kaldi server
     */
    startListening() {
        this.cloudcast.open();
        this.startLoading();
        this.updateRecording(true);
    }

    /**
     * End streaming audio to kaldi server
     */
    stopListening() {
       this.cloudcast.stopListening();
       this.updateRecording(false);
    }



    /**
     * Store the words the user is weak in
     * @param words
     */
    saveWeakWords(words: string[]){
        let saveWeakWords = this.db.object(this.weakWordsPath);
        saveWeakWords.set(words);
    }

    //#TODO: Actually handle errors correctly
    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    /**
     * Retrieve an index in the user path
     * @param {string} type
     * @returns {FirebaseObjectObservable<number>}
     */
    getIndex(type:string): FirebaseObjectObservable<any>{
        return this.db.object(this.userPath + `/userData/${type}`);
    }

    /**
     * Return the current user
     */
    loadUser(): firebase.User {
        return this.auth.getUser();
    }

    /**
     * Retrieve the phonemes which make up a word using the mapping
     * @returns {Promise<any>}
     */
    getPhonemes(word:string): Promise<any> {
        return this.http.get(this.phonemeMappingUrl + '/' + word)
            .toPromise()
            .then(response => response.json().data)
            .catch(ReadingService.handleError);
    }

    /**
     * send confidence scores
     */
    updateKaldiResult(result:KaldiResult){
         this.kaldiResult$.next(result);
    }

    /**
     * Update the recording observable
     */
    updateRecording(value:boolean): void {
        this.isRecording.next(value);
    }

    /**
     * Manage the decoder
     */
    manageDecoding(code:number) {
        switch (code) {
            case 11:
                this.updateRecording(false);
                break;

            case 9:
                this.stopLoading();
                break;
            default:

        }
    }

    /**
     * =================
     * Loading functions
     * ==================
     */
    startLoading() {
        this.loadingScreen = pleaseWait({
            backgroundColor: '#f8fcff',
            loadingHtml: ` Loading Acoustic Model
                            <div class='sk-wave'>
                            <div class="sk-rect sk-rect1"></div>
                            <div class="sk-rect sk-rect2"></div>
                            <div class="sk-rect sk-rect3"></div>
                            <div class="sk-rect sk-rect4"></div>
                            <div class="sk-rect sk-rect5"></div>
                          </div>`
        });
    }

    stopLoading(){
        this.loadingScreen.finish();
    }

    renderModal(message:string): void {
        console.log('calling method');
        this.modal.alert()
            .title('Woops')
            .body(message)
            .open();
    }



}