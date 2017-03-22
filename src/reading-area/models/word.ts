
export interface IWord {
    correctness: number,
    phonemes : string[],
    color : string,
    completed: boolean
}

export class Word implements IWord {
    correctness: number;
    completed: boolean = false;
    color: string = 'grey';
    phonemes: string[];

    constructor(phonemes: string[]){
        this.phonemes = phonemes;
    }
}