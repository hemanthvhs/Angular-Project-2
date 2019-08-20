import { NgModule } from '@angular/core';
/* import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; */

import {
    MatInputModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule, 
    MatTableModule,MatSortModule,MatNativeDateModule,MatPaginatorModule ,
    MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';


@NgModule({

imports: [MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,
          MatSidenavModule, MatListModule, MatToolbarModule],

exports: [ MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,MatSidenavModule, 
          MatListModule, MatToolbarModule]

})

export class MaterialModule { }