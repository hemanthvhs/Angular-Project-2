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
import { SharePointService } from '../shared/services/sharepoint.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  deleteForm              : FormGroup
  currentUser             : string
  population$             : Observable<any>
  filterData              = new Filters();

  selection = new SelectionModel(true, []);   

  constructor(private formBuilder : FormBuilder,
              private spinner: NgxSpinnerService,
              private sharePointService : SharePointService,
              private sqlService  : SqlService,
              private notificationService : NotificationService,
              private sharedService : SharedService,
              private dialog : MatDialog) { }


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

    this.spinner.show();

    this.sharePointService.getCurrentUserName().subscribe(currentUser => {
      this.currentUser = currentUser
    })

    

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.deleteForm = this.formBuilder.group({
      
      population   : ['',Validators.required],
      userid       : [''],
      createddate  : ['']
    })

    this.population$ = this.sqlService.getDeletePagePopulation()
   
  } // End of OnInit

  ngAfterViewInit(){
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    
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
    else {
            this.dataSource.data.forEach(row => this.selection.select(row));   
        }
}


onSearch() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  this.filterData.userID       = this.deleteForm.get('userid').value
  this.filterData.population   = this.deleteForm.get('population').value
  this.filterData.createdDate  = this.deleteForm.get('createddate').value ?
                                 this.deleteForm.get('createddate').value.toISOString().substring(0,10) : ''

  const isSearchAllowed : boolean = this.deleteForm.get('userid').value       ? true :
                                    this.deleteForm.get('population').value   ? true :
                                    this.deleteForm.get('createddate').value  ? true : false

  if(isSearchAllowed) {

        this.spinner.show();
        this.drawer.toggle()
        this.sqlService.getDeletePageTickets(this.filterData).subscribe( ticketData => {
          this.dataSource.data = ticketData;
          this.spinner.hide();
        })

  }
  else { 
    this.sharedService.passMessage({message : 'Atleast one filter is required'})
    this.dialog.open(DialogComponent)
    
  }

}

onReset() {
  this.deleteForm.get('population').patchValue('')
  this.deleteForm.get('userid').patchValue('')
  this.deleteForm.get('createddate').patchValue('')
}

onDelete(selectedTicketCode : string) {

  this.sharedService.passMessage({message : 'Delete' , ticketCode : selectedTicketCode})
  let dialogRef = this.dialog.open(DialogComponent)
  dialogRef.afterClosed().pipe(
    mergeMap(result => {
      if(result === 'true' && ((this.selection.selected.length === 1) || selectedTicketCode )) {
        this.spinner.show()
        return this.sqlService.getDeletePageAttachments(selectedTicketCode)
      }
    }),
    mergeMap((filePaths)=> {
      return this.sqlService.deleteTicketDetails(selectedTicketCode,filePaths)
    })
  ).subscribe(() => {
    let index = this.dataSource.data.findIndex(ticketData => ticketData.Ticketcode === selectedTicketCode)
    this.dataSource.data.splice(index,1)
    this.dataSource = new MatTableDataSource<Ticket>(this.dataSource.data)
    this.spinner.hide()
    this.selection = new SelectionModel(true, []);
    this.spinner.hide()
    this.notificationService.openSnackBar('Deleted Successfully')
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    
  })
}

onMultiDelete() {
  var selectedTicketCodes : string[] = this.selection.selected.map(tickets => {
    return tickets.Ticketcode
  })
  this.sharedService.passMessage({message : 'Delete',dataCount : selectedTicketCodes.length})
  var selectedTicketCodes : string[] = this.selection.selected.map(tickets => {
    return tickets.Ticketcode
  })
  let dialogRef = this.dialog.open(DialogComponent)
  dialogRef.afterClosed().pipe(
    mergeMap(result => {
      if(result === 'true' && this.selection.selected.length > 1) {
        this.spinner.show()
       
        return this.sqlService.getDeletePageAttachments(selectedTicketCodes)
      }
    }),
    mergeMap((filePaths)=> {
      return this.sqlService.deleteTicketDetails(selectedTicketCodes,filePaths)
    })
  ).subscribe(() => 
          this.selection.selected.forEach(item => {
          let index = this.dataSource.data.findIndex(ticketData => ticketData.Ticketcode === item.Ticketcode)
          this.dataSource.data.splice(index,1)
          this.dataSource = new MatTableDataSource<Ticket>(this.dataSource.data)
          this.spinner.hide()
          this.selection = new SelectionModel(true, []);
          this.notificationService.openSnackBar('Deleted Successfully')
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          })) 
}




}
