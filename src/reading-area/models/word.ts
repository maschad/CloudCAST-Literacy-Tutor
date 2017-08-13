
export interface IWord {
    title: string
    phonemes:string[],
    color : string,
    completed: boolean
}

export class WordVM implements IWord {
     phonemes: string[];
     title: string;
     completed: boolean = false;
     color: string = 'white';

    constructor(title:string, phonemes:string[]){
        this.title = title;
        this.phonemes = phonemes;
    }

    changeColor(color: string): void {
        this.color = color;
    }

    completeWord() : void {
        this.completed = true;
    }

    getPhonemes() : string[] {
        return this.phonemes;
    }
}