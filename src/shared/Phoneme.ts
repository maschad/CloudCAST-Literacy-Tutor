export interface IPhoneme {
    label: string,
    start:number,
    length:number,
    confidence:number
}

export class Phoneme implements IPhoneme{
    label: string;
    start: number;
    length: number;
    confidence: number;

    constructor(label: string, start: number, length: number, confidence: number) {
        this.label = label;
        this.start = start;
        this.length = length;
        this.confidence = confidence;
    }

    getLabel() {
        return this.label;
    }

    getConfidence(){
        return this.confidence;
    }

}