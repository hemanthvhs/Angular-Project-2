import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms' ;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from './shared/modules/material.module'

import { AppComponent } from './app.component';
import { DispformComponent } from './dispform/dispform.component';

import { PrintService } from './shared/services/print.service';

@NgModule({
  declarations: [
    AppComponent,
    DispformComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [PrintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
