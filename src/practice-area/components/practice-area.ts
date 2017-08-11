/**
 * Created by carlos on 5/7/17.
 */


import {Component, OnInit} from "@angular/core";
import {PracticeService} from "../services/practice-service";
import {Word} from "../../reading-area/models/word";
import {Observable} from "rxjs";

@Component({
    selector: 'practice-area',
    styles : [
        require('./practice-area.scss')
    ],
    template: require('./practice-area.html')
})

export class PracticeAreaComponent implements OnInit{
    practiceWords:Observable<Word[]>;
    weakWords: Observable<any>;

    ngOnInit(): void {
    }

    constructor(private practiceService:PracticeService) {}

    addWords() : void {

    }

}