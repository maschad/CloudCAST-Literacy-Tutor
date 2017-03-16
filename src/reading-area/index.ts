/**
 * Created by carlos on 3/11/17.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';
import { SentenceComponent } from './components/sentence';
import { ParagraphComponent } from './components/paragraph';
import { ReadingService } from './services/reading-service'


const routes: Routes = [
    {path: 'reading', component: ParagraphComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [

    ]
})

export class SentenceModule {}

export { ReadingService };