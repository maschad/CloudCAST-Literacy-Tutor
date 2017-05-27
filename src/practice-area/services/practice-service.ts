/**
 * Created by carlos on 5/7/17.
 */

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from '../../auth/services/auth-service';
import {Http} from '@angular/http';


@Injectable()
export class PracticeService  {
    private path = `/weakwords/${this.auth.id}`;


    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http) {}


    getPracticeWords(success: any): void {
        let weakwords = [];
         this.db.object(this.path, {preserveSnapshot: true }).subscribe(snapshot => {
             snapshot.forEach(function (word: any) {
                 weakwords.push(word.val());
             });
             success(weakwords);
         });
    }
}
