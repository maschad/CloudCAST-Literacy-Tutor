/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import {Word, IWord} from "../models/word";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";


@Injectable()
export class ReadingService {

    private sentence: Word[];
    private sentenceToBeRead: string[];
    private weakPhonemes: string;

    constructor(af: AngularFire, auth: AuthService){
        const path = `/reading-area/${auth.id}`;

        this.weakPhonemes = '';

    }

    createWord(phonemes: string[]){
        return this.sentence.push(new Word(phonemes));
    }


    createSentenceToBeRead(words: string[]): void {
        this.sentenceToBeRead = words;
    }

    processSentenceToBeRead(): string[] {
        return this.sentenceToBeRead;
    }

    readFromText(inputValue: any) : void {
        let file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = function(e){
            // you can perform an action with readed data here
        };

        myReader.readAsText(file);
    }





}