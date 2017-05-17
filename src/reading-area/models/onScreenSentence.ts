/**
 * Created by carlos on 4/18/17.
 */

export class onScreenSentence {
    id: number;
    text: string;

    constructor(id:number, text:string){
        this.id = id;
        this.text = text;
    }

    setText(text: string) : void {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    getCurrentId() : number {
        return this.id;
    }

    setCurrentId(id: number) : void {
        this.id = id;
    }

    incrementId() : void {
        this.id++;
    }
}