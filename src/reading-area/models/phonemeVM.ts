export  class  PhonemeVM {
    confidence: number;
    phone: string;

    constructor(phone:string){
        this.confidence = 0;
        this.phone = phone;
    }

    updatePhone(phone:string) {
        this.phone = phone;
    }

    updateConfidence(confidence: number): void {
        this.confidence = confidence;
    }


}