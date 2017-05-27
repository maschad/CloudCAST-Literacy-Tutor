/**
 * Created by carlos on 4/18/17.
 */

export class OnScreenSentence {
    id: number;
    text: string;
    highestScore: number;

    constructor(id: number, text: string){
        this.id = id;
        this.text = text;
        this.highestScore = 0;

    }

    setText(text: string): void {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    getCurrentId(): number {
        return this.id;
    }

    setCurrentId(id: number): void {
        this.id = id;
    }

    incrementId(): void {
        this.id++;
    }

    setHighestScore(score: number): void {
        if (score > this.highestScore){
            this.highestScore = score;
        }
    }

}