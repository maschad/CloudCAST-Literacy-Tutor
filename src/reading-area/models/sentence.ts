/**
 * Created by carlos on 3/5/17.
 */

export interface ISentence {
    $key? : string,
    completed: boolean,
    correctness : number,
    title: string
}

export class Sentence implements ISentence {
    completed: boolean = false;
    correctness: number = 0;
    title: string;

    constructor(title: string){
        this.title = title;
    }
}