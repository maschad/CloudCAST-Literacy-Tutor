/**
 * Created by carlos on 5/16/17.
 */

import {Injectable} from "@angular/core";
import {FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {IScore} from "../../reading-area/models/score";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Headers} from "@angular/http";

@Injectable()
export class ResultService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private sentencesUrl = 'api/onScreenSentences';

    private userResults: FirebaseObjectObservable<IScore>;
    private allResults : FirebaseListObservable<IScore>;
    private highestResults: FirebaseListObservable<IScore[]>;
    private auth: AuthService;


    constructor(db:AngularFireDatabase, auth:AuthService, private http:Http){
        const path = `/results/`;
        const authPath = `/results/${auth.id}`;
        this.userResults = db.object(authPath);
        this.highestResults = db.list(path, {
            query: {
                orderByChild: 'totalCorrect',
                limitToFirst: 1
            }
        })

    }

    getUserResults() : FirebaseObjectObservable<IScore> {
        return this.userResults;
    }

    getHighestResult() : FirebaseListObservable<IScore[]> {
        return this.highestResults;
    }

    getLabels(): Promise<any[]> {
        return this.http.get(this.sentencesUrl)
            .toPromise()
            .then(response => response.json().data as any[])
            .catch(ResultService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}