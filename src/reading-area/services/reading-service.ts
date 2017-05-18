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

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    private sentencesUrl = 'api/onScreenSentences';
    private results: FirebaseObjectObservable<IScore>;
    private path = `/results/${this.auth.id}`;



    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http){}


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

    saveScore(newScore: Score , id:number) {
        this.results = this.db.object(this.path + `/${id}`);
        this.results.update({score:newScore});
    }

    setHighestScore(score:number, id:number): void{
        this.http.post(this.sentencesUrl + '/' + id, {highestScore:score}, this.options)
            .toPromise()
            .catch(ReadingService.handleError)
    }

    retrieveScore(id:number): FirebaseObjectObservable<IScore> {
        return this.db.object(this.path + `/${id}`);
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }





}