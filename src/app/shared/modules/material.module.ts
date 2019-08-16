import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({

imports: [MatTableModule,MatSortModule,MatPaginatorModule],
exports: [MatTableModule,MatSortModule,MatPaginatorModule]

})

export class MaterialModule { }