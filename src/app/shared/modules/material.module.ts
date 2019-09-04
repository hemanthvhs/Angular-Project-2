import { NgModule } from '@angular/core';
import { MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule, 
         MatTableModule,MatSortModule,MatNativeDateModule,MatPaginatorModule ,
         MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';


@NgModule({

imports: [ MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,
          MatSidenavModule, MatListModule, MatToolbarModule ],

exports: [ MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,MatSidenavModule, 
          MatListModule, MatToolbarModule ]

})

export class MaterialModule { }