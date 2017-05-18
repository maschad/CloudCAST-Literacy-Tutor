/**
 * Created by carlos on 5/7/17.
 */

import {Component, OnInit} from "@angular/core";
import {ResultService} from "../services/result-service";

@Component({
    selector: 'results',
    template: require('./results-area.html') ,
    styles: [
        require('./results-area.scss')
    ]
})

export class ResultsAreaComponent implements OnInit{
    private highestResults: any;
    private barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    private barChartType:string = 'bar';
    private barChartLegend:boolean = true;
    private barChartLabels:string[] = [];
    /*private barChartData:any[] = [
     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Your score'},
     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Highest Score'}
     ]; */
    private barChartData: any[] = [];

    constructor(private resultService: ResultService){}

    ngOnInit(): void {
        let highestScoreData = [];
        let userScoreData = [];
        this.resultService.getLabels().then(response => {
            for(let index of response){
                this.barChartLabels.push("Paragraph " + index.id);
                userScoreData.push(this.resultService.getUserScoreforParagraph(index.id));
                this.resultService.getHighestResult(index.id).then(score => highestScoreData.push(score));
            }
        });
        this.barChartData.push({data: userScoreData, label: 'Your score'},{data: highestScoreData, label: 'Highest Score'});
        console.log('barChartLabels', this.barChartLabels);

    }





}