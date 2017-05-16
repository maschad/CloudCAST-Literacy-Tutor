
export interface IWord {
    title: string,
    phonemes : string[],
    color : string,
    completed: boolean
}

export class Word implements IWord {
    title: string;
    completed: boolean = false;
    color: string = 'grey';
    phonemes: string[];

    constructor(title:string,phonemes: string[]){
        this.title = title;
        this.phonemes = phonemes;
    }
}