/**
 * Created by carlos on 5/16/17.
 */
export interface IScore {
    id: number
    totalCorrect: number
    totalWrong: number
}


export class Score implements IScore {
    id: number;
    totalCorrect: number;
    totalWrong: number;

    constructor(id:number) {
        this.id = id;
        this.totalCorrect = 0;
        this.totalWrong = 0;
    }


    private updateScore(totalCorrect: number, totalWrong: number) {
        this.totalCorrect+= totalCorrect;
        this.totalWrong+= totalWrong;
    }
}