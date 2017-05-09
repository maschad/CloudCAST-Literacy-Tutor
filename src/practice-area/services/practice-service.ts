/**
 * Created by carlos on 5/7/17.
 */

import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {Http, Headers} from "@angular/http";


@Injectable()
export class PracticeService  {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(af: AngularFire, auth: AuthService, private http: Http) {
    }
}