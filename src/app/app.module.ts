import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms' ;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './shared/modules/material.module'
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { DispformComponent } from './dispform/dispform.component';

import { PrintService } from './shared/services/print.service';
import { SqlService } from './shared/services/sql.service';
import { SearchComponent } from './search/search.component';
import { DataService } from './shared/services/data.service';
import { NotificationService } from './shared/services/notification.service';
import { DialogComponent } from './dialog/dialog.component';
import { SharedService } from './shared/services/shared.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule,Routes } from '@angular/router';

const appRoutes : Routes = [
  { path : 'search' , component: SearchComponent },
  { path : 'search/form/:TicketID/readonly' ,component:DispformComponent},
  { path : '' , redirectTo : '/search' , pathMatch : 'full' } ,
  { path : 'not-found' , component : PageNotFoundComponent},
  /* { path : '**' , redirectTo : '/not-found'}  */
]

@NgModule({
  declarations: [
    AppComponent,
    DispformComponent,
    SearchComponent,
    DialogComponent,
    PageNotFoundComponent,
  ],
  entryComponents : [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [PrintService,SqlService,DataService,NotificationService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
