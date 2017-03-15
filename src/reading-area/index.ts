/**
 * Created by carlos on 3/11/17.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';


const routes: Routes = [
    {path: 'reading', component: ReadingComponent, canActivate: [AuthGuard]}
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