import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms' 

import { AppComponent } from './app.component';
import { DispformComponent } from './dispform/dispform.component';

@NgModule({
  declarations: [
    AppComponent,
    DispformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
