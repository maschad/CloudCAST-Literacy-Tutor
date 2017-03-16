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
import  { ISentence , Sentence } from '../models/sentence';


@Injectable()
export class ReadingService {


}