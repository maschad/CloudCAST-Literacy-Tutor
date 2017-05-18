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
import {Http, Response, Headers} from "@angular/http";
import {onScreenSentence} from "../models/onScreenSentence";
import {Score, IScore} from "../models/score";


@Injectable()
export class ReadingService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private sentencesUrl = 'api/onScreenSentences';
    private results: FirebaseObjectObservable<IScore>;


    constructor(db: AngularFireDatabase, auth: AuthService, private http: Http){
        const path = `/results/${auth.id}`;
        this.results = db.object(path);
    }


    getOnScreenSentences(): Promise<onScreenSentence[]> {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(response => response.json().data as onScreenSentence[])
            .catch(ReadingService.handleError);
    }

    getOnScreenParagraph(id: number): Promise<onScreenSentence> {
        return this.http.get(this.sentencesUrl + '/' + id)
            .toPromise()
            .then(response => response.json().data as onScreenSentence)
            .catch(ReadingService.handleError);
    }

    saveScore(newScore: Score) {
        this.results.set({score: newScore});
    }

    retrieveScore(): FirebaseObjectObservable<Score> {
        return this.results;
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }





}