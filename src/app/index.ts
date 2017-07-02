import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { FirebaseModule } from '../firebase';
import { ElasticModule } from 'angular2-elastic';


import { AppComponent } from './components/app';
import { AppHeaderComponent } from './components/app-header';
import { ReadingModule } from "../reading-area";
import {ResultsModule} from "../results-area/index";
import {SidebarModule} from "ng-sidebar";
import {PracticeModule} from "../practice-area/index";
import {MdToolbarModule} from "@angular/material";


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    ElasticModule,
    FirebaseModule,
    MdToolbarModule,
    PracticeModule,
    ReadingModule,
    ResultsModule,
    RouterModule.forRoot([], {useHash: false}),
    SidebarModule.forRoot(),
  ]
})

export class AppModule {}
