/**
 * Created by carlos on 5/16/17.
 */
export interface IScore {
    $key?: number,
    totalCorrect: number,
    totalWrong: number,
    incorrectWords: string[]
}


export class Score implements IScore {
    totalCorrect: number;
    totalWrong: number;
    incorrectWords: string[];

    constructor() {
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.incorrectWords = [];
    }


    public updateScore(totalCorrect: number, totalWrong: number, incorrectWords: string[]) {
        this.totalCorrect+= totalCorrect;
        this.totalWrong+= totalWrong;
        this.incorrectWords.concat(incorrectWords);
    }
}