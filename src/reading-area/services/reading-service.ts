/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2';
import {AuthService} from '../../auth/services/auth-service';
import {Http,Headers, RequestOptions} from '@angular/http';
import {Score, IScore} from '../models/score';
import {OnScreenSentence} from '../models/onScreenSentence';


@Injectable()
export class ReadingService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    private sentencesUrl = 'api/OnScreenSentences';
    private results: FirebaseObjectObservable<IScore>;
    private path = `/results/${this.auth.id}`;
    private kaldiPath = 'http://52.34.157.194/home/ubuntu/';
    private weakWordsPath = `/weakwords/${this.auth.id}`;




    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http){}


    getOnScreenSentences(): Promise<OnScreenSentence[]> {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(response => response.json().data as OnScreenSentence[])
            .catch(ReadingService.handleError);
    }

    getOnScreenParagraph(id: number): Promise<OnScreenSentence> {
        return this.http.get(this.sentencesUrl + '/' + id)
            .toPromise()
            .then(response => response.json().data as OnScreenSentence)
            .catch(ReadingService.handleError);
    }

    saveScore(newScore: Score , id: number): void {
        this.results = this.db.object(this.path + `/${id}`);
        this.results.set({score:newScore});
    }

    setHighestScore(score: number, id: number): void{
        console.log('setting highest score');
        this.http.post(this.sentencesUrl + '/' + id, {highestScore:score}, this.options)
            .toPromise()
            .catch(ReadingService.handleError);
    }


    retrieveScore(id: number): FirebaseObjectObservable<IScore> {
        return this.db.object(this.path + `/${id}`);
    }

    saveWeakWords(words: string[]): void {
        let saveWeakWords = this.db.object(this.weakWordsPath);
        saveWeakWords.set(words);
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}