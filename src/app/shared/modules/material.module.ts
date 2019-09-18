import { NgModule } from '@angular/core';
import { MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule, 
         MatTableModule,MatSortModule,MatNativeDateModule,MatPaginatorModule ,
         MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule,MatInputModule } from '@angular/material';


@NgModule({

imports: [ MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,MatInputModule,
          MatSidenavModule, MatListModule, MatToolbarModule ],

exports: [ MatSelectModule,MatCheckboxModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatFormFieldModule,MatDatepickerModule,MatButtonModule,MatTableModule,
          MatSortModule,MatPaginatorModule,MatNativeDateModule,MatIconModule,MatSidenavModule, 
          MatListModule, MatToolbarModule,MatInputModule]

})

export class MaterialModule { }