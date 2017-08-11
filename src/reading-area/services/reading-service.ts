///<reference path="../models/word.ts"/>
/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


import { Injectable } from '@angular/core';
import {Word, IWord} from "../models/word";
import {AngularFire, FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {onScreenSentence} from "../models/onScreenSentence";
import {Score, IScore} from "../models/score";


@Injectable()
export class ReadingService {
    //JSON Headers and Options for HTTP requests
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    //In Memory API #TODO: Change when using actual server
    private sentencesUrl = 'api/onScreenSentences';

    private results: FirebaseObjectObservable<IScore>;
    private path = `/results/${this.auth.id}`;
    private weakWordsPath = `/weakwords/${this.auth.id}`;



    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http){}



    /**
     *Load the paragraph to be read
     * @param id
     * @returns {Promise<onScreenSentence>}
     */

    getOnScreenParagraph(id: number): Promise<onScreenSentence> {
        return this.http.get(this.sentencesUrl + '/' + id)
            .toPromise()
            .then(response => response.json().data as onScreenSentence)
            .catch(ReadingService.handleError);
    }

    /**
     * When a reader has finished a paragraph, we want to store that score in firebase
     * @param newScore
     * @param id
     */
    saveScore(newScore: Score , id:number) {
        this.results = this.db.object(this.path + `/${id}`);
        this.results.set({ score:newScore });
    }

    /**
     * Once that score has been completed we want to set it if it's the high score
     * @param score
     * @param id
     */
    setHighestScore(score:number, id:number): void{
        console.log('setting highest score');
        this.http.post(this.sentencesUrl + '/' + id, {highestScore:score}, this.options)
            .toPromise()
            .catch(ReadingService.handleError)
    }

    /**
     * Retrieve a score for a current score
     * @param id
     * @returns {FirebaseObjectObservable<any>}
     */
    retrieveScore(id:number): FirebaseObjectObservable<IScore> {
        return this.db.object(this.path + `/${id}`);
    }

    retrieveKaldiScore(audio: any) : any {
        //#TODO: Send Audio to Kaldi and retrieve a Score
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





}