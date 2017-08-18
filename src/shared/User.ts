import {IScore, Score} from "../reading-area/models/score";
import {Word} from "./Word";

export interface IUser {
    id:string,
    lastReadParagraphId: number,
    score : IScore,
    weakWords: Word[]
}

export class User implements IUser {
    id: string;
    lastReadParagraphId: number;
    score: IScore;
    weakWords: Word[];

    constructor(id:string){
        this.id = id;
        this.lastReadParagraphId = 1;
    }

    updateScore(score: Score){
        this.score = score;
    }

    updateWeakWords(weakWords:Word[]){
        this.weakWords = weakWords;
    }

    getLastReadParagraphId(): number {
        return this.lastReadParagraphId;
    }

}