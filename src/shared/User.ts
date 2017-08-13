import {IScore, Score} from "../reading-area/models/score";
import {IWord} from "../reading-area/models/word";

export interface IUser {
    id:number,
    lastReadParagraphId: number,
    score : IScore,
    weakWords: IWord[]
}

export class User implements IUser {
    id: number;
    lastReadParagraphId: number;
    score: IScore;
    weakWords: IWord[];

    constructor(id:number){
        this.id = id;
        this.lastReadParagraphId = 0;
    }

    updateScore(score: Score){
        this.score = score;
    }

    updateWeakWords(weakWords:IWord[]){
        this.weakWords = weakWords;
    }

}