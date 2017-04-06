import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { FirebaseModule } from '../firebase';
import { TasksModule } from '../tasks';
import { ElasticModule } from 'angular2-elastic';


import { AppComponent } from './components/app';
import { AppHeaderComponent } from './components/app-header';
import { ReadingModule } from "../reading-area";


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    ElasticModule,
    RouterModule.forRoot([], {useHash: false}),
    AuthModule,
    FirebaseModule,
    ReadingModule,
    TasksModule
  ]
})

export class AppModule {}
