

import {PhonemeVM} from "./phonemeVM";
import {Phoneme} from "../../shared/Phoneme";

export interface IWord {
    title: string
    phonemes:PhonemeVM[],
    completed: boolean,
    color: string
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

    setPhonemes(phonemes: PhonemeVM[]) : void {
        this.phonemes = phonemes;
    }

    setColor(): void {
        let count = 0;
        this.phonemes.forEach(phoneme => {
           if(phoneme.confidence > 0.3){
               count++;
               console.log('incrementing count');
           }
        });
        console.log('count is equal to', count);
        if(count > (this.phonemes.length)/2){
            this.color = 'green';
        }else{
            this.color = 'red';
        }

    }

    getColor(): string {
        return this.color;
    }

    comparePhones(phoneme:Phoneme){
        this.phonemes.forEach(vmPhoneme => {
            if(vmPhoneme.phone == phoneme.phone) {
                console.log('phone ', vmPhoneme.phone, 'is equal to' , phoneme.phone);
                console.log('the confidence for this phone is ', phoneme.confidence);
                vmPhoneme.confidence = phoneme.confidence;
            } else {
                vmPhoneme.confidence = 0;
            }
        });
        this.setColor();
    }
}