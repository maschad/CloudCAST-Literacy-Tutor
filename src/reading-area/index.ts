/**
 * Created by carlos on 3/11/17.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';

import { ReadingService } from './services/reading-service'
import {HighlightDirective} from "./directives/highlight-directive";
import {ReadingAreaComponent} from "./components/reading-area";


const routes: Routes = [
    {path: 'reading', component: ReadingAreaComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [

    ],
    imports: [
        HighlightDirective,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [

    ]
})

export class SentenceModule {}

export { ReadingService };