/**
 * Created by carlos on 5/7/17.
 */

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from '../../auth/services/auth-service';
import {Http} from '@angular/http';


@Injectable()
export class PracticeService  {

     headers: Headers = new Headers({'Content-Type': 'application/json'});



    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http) {}

    retrieveSentence(sentenceId: number): string[] {
        let sentence:string [] = [];
        //#TODO: Perform sentence transformation
        return sentence;
    }

    sendAudio(audio: any): void {

    }

}
