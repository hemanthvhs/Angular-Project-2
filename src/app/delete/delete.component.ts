import { Component, OnInit ,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource,MatSort, MatPaginator } from '@angular/material';
import { NotificationService } from '../shared/services/notification.service';
import { MatDialog, MatSidenav } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../shared/services/shared.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections'
import { Observable } from 'rxjs';
import { SqlService } from '../shared/services/sql.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Filters } from '../shared/models/filters';
import { Ticket } from '../shared/models/ticketdata';
import { NgxSpinnerService } from "ngx-spinner";
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  deleteForm              : FormGroup
  selection = new SelectionModel(true, []);   

  constructor(private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private sqlService  : SqlService,
    private notificationService : NotificationService,
    private sharedService : SharedService,
    private dialog : MatDialog,
    private router : Router,
    private route  : ActivatedRoute) { }


    displayedColumns : string[] = ['select','Ticketcode','actions','USER_NAME','Priority','ServiceGroup','Population','Category','SubCategory','Email','CreatedDateTime','Closed_Date_Time']
    dataSource = new MatTableDataSource<Ticket>()

  @ViewChild('drawer') drawer : MatSidenav
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set content(content: any) {
    this.sort = content;
    if (this.sort){
       this.dataSource.sort = this.sort;
  
    }
  }
  @ViewChild(MatPaginator) set pageContent (pageContent: any){ 
    this.paginator = pageContent; 
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; 
    }
  }


  ngOnInit() {

    this.deleteForm = this.formBuilder.group({
      employeeid  : [''],
      population  : [''],
      date        : ['']
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if(this.isAllSelected()){
            this.selection.clear();
            
        }
    else{
            this.dataSource.data.forEach(row => this.selection.select(row));
           
    }

}

onSearch() {
  this.drawer.toggle()
}

}
