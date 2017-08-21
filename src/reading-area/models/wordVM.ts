

import {PhonemeVM} from "./phonemeVM";

export interface IWord {
    title: string
    phonemes:PhonemeVM[],
    color : string,
    completed: boolean
}

export class WordVM implements IWord {
     phonemes: PhonemeVM[];
     title: string;
     completed: boolean = false;
     color: string = 'white';

    constructor(title:string, phonemes:PhonemeVM[]){
        this.title = title;
        this.phonemes = phonemes;
    }


    completeWord() : void {
        this.completed = true;
    }

    getPhonemes() : PhonemeVM[] {
        return this.phonemes;
    }
}