import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms' ;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './shared/modules/material.module'
import { HttpClientModule} from '@angular/common/http'
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppComponent } from './app.component';
import { DispformComponent } from './dispform/dispform.component';


import { PrintService } from './shared/services/print.service';
import { SqlService } from './shared/services/sql.service';
import { SearchComponent } from './search/search.component';

import { NotificationService } from './shared/services/notification.service';
import { DialogComponent } from './dialog/dialog.component';
import { SharedService } from './shared/services/shared.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule,Routes } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { DeleteComponent } from './delete/delete.component';
import { SharePointService } from './shared/services/sharepoint.service';
import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { AuthService } from './shared/services/guards/auth.service';
import { CanDeactivateGuard } from './shared/services/guards/can-deactivate-guard.service';

const appRoutes : Routes = [
  { path : '' , component: SearchComponent },
  { path : 'search' , component: SearchComponent, canDeactivate : [CanDeactivateGuard],
    children : [{ path : 'form' , component : DispformComponent}]},
  { path : 'delete' , canActivate : [AuthGuard],component : DeleteComponent},
  { path : 'not-found' , component : PageNotFoundComponent},
  { path : '**' , redirectTo : '/not-found'} 
]


@NgModule({
  declarations: [
    AppComponent,
    DispformComponent,
    SearchComponent,
    DeleteComponent,
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
    NgxSpinnerModule,
    MatTableExporterModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [PrintService,SqlService,SharePointService,NotificationService,
              SharedService,AuthGuard,AuthService,CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
