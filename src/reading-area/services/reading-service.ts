///<reference path="../models/word.ts"/>
/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import {Word, IWord} from "../models/word";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";


@Injectable()
export class ReadingService {

    private sentence: Word[];
    private sentenceToBeRead: string[];
    private weakPhonemes: string;
    private path: string = '../../../assets/paraprapgh.txt';


    constructor(af: AngularFire, auth: AuthService, private http: Http){
        const path = `/reading-area/${auth.id}`;
        this.weakPhonemes = '';
    }

    createWord(title:string,  phonemes: string[]){
        return this.sentence.push(new Word(title,phonemes));
    }


    createSentenceToBeRead(words: string[]): void {
        this.sentenceToBeRead = words;
    }

    processSentenceToBeRead(): string[] {
        return this.sentenceToBeRead;
    }

    loadParagraph(): Observable<string[]> {
        return this.http.get(this.path).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    readFromText(inputValue: any) : Word[] {
        let words: Array<Word>;
        let file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = function(e){
            // you can perform an action with readed data here
        };

        myReader.readAsText(file);

        return words;
    }





}