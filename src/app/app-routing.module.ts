import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DispformComponent } from './dispform/dispform.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes : Routes = [
    { path : 'search' , component: SearchComponent },
    { path : 'search/:TicketID' , component : DispformComponent},
    { path : '' , redirectTo : '/search' , pathMatch : 'full' },
    { path : '**' , component : PageNotFoundComponent }
]

@NgModule({
   imports : [ RouterModule.forRoot(appRoutes) ],
   exports : [ RouterModule ]
})
export class AppRoutingModule {}