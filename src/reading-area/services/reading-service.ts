/**
 * Created by carlos on 3/15/17.
 */
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../../auth';
import {IWord, Word} from '../models/word';


@Injectable()
export class ReadingService {
    sentences : Observable<IWord[]>;
    private strikethrough: ReplaySubject<any>  = new ReplaySubject(1);
    private readSentence : FirebaseListObservable<IWord[]>;
    private currentSentence: FirebaseListObservable<IWord[]>;

    constructor(af: AngularFire, auth:AuthService){
        const path = `/reading-area/${auth.id}`;

        this.readSentence = af.database.list(path);
    }

    createSentence(words: Word[]): firebase.Promise<any> {

    }

    readSentence(words: Word[]): void {

    }



}