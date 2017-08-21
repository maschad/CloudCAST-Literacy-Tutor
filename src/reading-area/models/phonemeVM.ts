export  class  PhonemeVM {
    confidence: number;
    title: string;
    color: string = 'white';

    constructor(title:string){
        this.confidence = 0;
        this.title = title;
    }

    updateTitle(title:string) {
        this.title = title;
    }

    updateConfidence(confidence: number): void {
        this.confidence = confidence;
        if(this.confidence > 0.7){
            this.color = 'green';
        } else {
            this.color = 'red';
        }
    }
}