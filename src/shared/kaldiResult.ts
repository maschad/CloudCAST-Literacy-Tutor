import {Phoneme} from "./Phoneme";

export class KaldiResult {
    likelihood: number;
    phonemes: Phoneme[];
    transcript:string;
    wordAlignment: Phoneme[];


    constructor(transcript:string, phonemes:Phoneme[], likelihood:number, wordAlignment: Phoneme[]){
        this.transcript = transcript;
        this.phonemes = phonemes;
        this.likelihood = likelihood;
        this.wordAlignment = wordAlignment;
    }

    getPhonemes(){
        return this.phonemes;
    }

}