/**
 * Created by carlos on 5/7/17.
 */

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from '../../auth/services/auth-service';
import {Http} from '@angular/http';


@Injectable()
export class PracticeService  {
<<<<<<< HEAD
    private path = `/weakwords/${this.auth.id}`;
=======
     headers: Headers = new Headers({'Content-Type': 'application/json'});
     options: RequestOptions = new RequestOptions({ headers: this.headers });
>>>>>>> dev



    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http) {}

<<<<<<< HEAD
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
=======
    retrieveSentence(sentenceId: number): string[] {
        let sentence:string [] = [];
        //#TODO: Perform sentence transformation
        return sentence;
    }

    sendAudio(audio: any): void {

    }

}
>>>>>>> dev
