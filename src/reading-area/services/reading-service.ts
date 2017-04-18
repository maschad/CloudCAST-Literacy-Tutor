///<reference path="../models/word.ts"/>
/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


import { Injectable } from '@angular/core';
import {Word, IWord} from "../models/word";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Response, Headers} from "@angular/http";
import {onScreenSentence} from "../models/onScreenSentence";


@Injectable()
export class ReadingService {

    private sentence: Word[];
    private sentenceToBeRead: string[];
    private weakPhonemes: string;
    private headers = new Headers({'Content-Type': 'application/json'});
    private sentencesUrl = 'api/onScreenSentences';


    constructor(af: AngularFire, auth: AuthService, private http: Http){
        const path = `/reading-area/${auth.id}`;
        this.weakPhonemes = '';
    }


    getOnScreenSentences(): Promise<onScreenSentence[]> {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(response => response.json().data as onScreenSentence[])
            .catch(ReadingService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }





}