/**
 * Created by carlos on 5/16/17.
 */

import {Injectable} from "@angular/core";
import {FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {IScore} from "../../reading-area/models/score";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Headers, RequestOptions} from "@angular/http";
import {type} from "os";

@Injectable()
export class ResultService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });
    private sentencesUrl = 'api/onScreenSentences';
    private userResults: FirebaseObjectObservable<IScore>;
    private authPath = `/results/${this.auth.id}`;



    constructor(private db:AngularFireDatabase, private auth:AuthService, private http:Http){}

    getUserScoreforParagraph(id) : number {
        this.db.object(this.authPath + `/${id}`, { preserveSnapshot: true }).subscribe(snapshot => {
            console.log('Snapshot type result: ' + snapshot.key);
            console.log(snapshot.val());
        });

        return 0;
    }

    getHighestResult(id) : Promise<number> {
        return this.http.get(this.sentencesUrl + '/' + id + '/highestScore')
            .toPromise()
            .then(response => response.json().data as number)
            .catch(ResultService.handleError)
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