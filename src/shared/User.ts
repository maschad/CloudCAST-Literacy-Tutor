import {IScore, Score} from "../reading-area/models/score";
import {IWord} from "../reading-area/models/word";

export interface IUser {
    id:string,
    lastReadParagraphId: number,
    score : IScore,
    weakWords: IWord[]
}

export class User implements IUser {
    id: string;
    lastReadParagraphId: number;
    score: IScore;
    weakWords: IWord[];

    constructor(id:string){
        this.id = id;
        this.lastReadParagraphId = 1;
    }

    updateScore(score: Score){
        this.score = score;
    }

    updateWeakWords(weakWords:IWord[]){
        this.weakWords = weakWords;
    }

    getLastReadParagraphId(): number {
        return this.lastReadParagraphId;
    }

}