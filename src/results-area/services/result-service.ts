/**
 * Created by carlos on 5/16/17.
 */

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from '../../auth/services/auth-service';
import {Http} from '@angular/http';

@Injectable()
export class ResultService {

    private sentencesUrl = 'api/onScreenSentences';
    private authPath = `/results/${this.auth.id}`;

    constructor(private db: AngularFireDatabase, private auth: AuthService, private http: Http){}

    getUserScoreforParagraphs(success: any): void {
        let scores = [];
        this.db.object(this.authPath , { preserveSnapshot: true }).subscribe(snapshot => {
            snapshot.forEach(function (score: any) {
                scores.push(score.val().score.totalCorrect);
            });
            success(scores);
        });

    }

    getHighestResults(): Promise<any> {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(ResultService.handleError);

    }


    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
