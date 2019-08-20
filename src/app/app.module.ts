import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms' ;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './shared/modules/material.module'
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { DispformComponent } from './dispform/dispform.component';

import { PrintService } from './shared/services/print.service';
import { SqlService } from './shared/services/sql.service';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { DataService } from './shared/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    DispformComponent,
    SearchpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [PrintService,SqlService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
