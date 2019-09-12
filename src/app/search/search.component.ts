import { Component, OnInit ,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
/* import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator' */

import { MatTableDataSource,MatSort, MatPaginator } from '@angular/material';

import { DataService } from '../shared/services/data.service';
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
  selector: 'app-searchpage',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit,AfterViewInit {

  searchForm              : FormGroup
  serviceGroup$           : Observable<any>
  population$             : Observable<any>
  categories              : string[]
  subCategory$            : Observable<any>
  createdStartDate        : string;
  createdEndDate          : string;
  closedStartDate         : string;
  closedEndDate           : string;
  filterData              = new Filters();
  

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

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);



    this.searchForm = this.formBuilder.group({
      servicegroup : ['',Validators.required],
      population   : ['',Validators.required],
      category     : ['',Validators.required],
      subcategory  : ['',Validators.required]
    })

    this.serviceGroup$ = this.sqlService.getServiceGroups()
 
  }   // End of OnInit

 

  ngAfterViewInit(){
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });

    console.log('Hi I am Called !')
    
  }

  get category() : FormControl {
    return this.searchForm.get('category') as FormControl
  }

  get subcategory() : FormControl {
    return this.searchForm.get('subcategory') as FormControl
  }

  onServiceGroupChange(serviceGroup : string) {
    this.searchForm.get('population').patchValue('')
    this.searchForm.get('category').patchValue('')
    this.searchForm.get('subcategory').patchValue('')
    this.population$ = this.sqlService.getPopulation(serviceGroup)
  }

  onPopulationChange(population : string) {
    this.searchForm.get('category').patchValue('')
    this.searchForm.get('subcategory').patchValue('')
    this.sqlService.getCategory(population).subscribe(categories => {
      this.categories = categories
    })
  }

  onCategoryChange(category : string) {
    this.searchForm.get('subcategory').patchValue('')
    const serviceGroup = this.searchForm.get('servicegroup').value
    const population   = this.searchForm.get('population').value
    this.subCategory$ = this.sqlService.getSubCategory(serviceGroup,population,category)
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

selectedRow(id : string) {
  console.log(id)
}



  onSearch() {
    this.spinner.show();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.filterData.serviceGroup = this.searchForm.get('servicegroup').value
    this.filterData.population   = this.searchForm.get('population').value
    this.filterData.category     = this.searchForm.get('category').value
    this.filterData.subCategory  = this.searchForm.get('subcategory').value

    if(this.searchForm.get('servicegroup').value) {
            this.drawer.toggle()
            this.sqlService.getTickets(this.filterData).subscribe( ticketData => {
              this.dataSource.data = ticketData;
              this.spinner.hide();
            })
          }
    
    else {
      this.sharedService.passMessage({message : "Atleast one filter is required"})
      let dialogRef = this.dialog.open(DialogComponent)
      
    }
  }

  onLaunch(ticketCode : string) { 
    console.log(ticketCode)
    this.router.navigate(["form"], 
    {relativeTo:this.route,queryParams : {TicketCode : ticketCode,Mode:'ReadOnly'}})
    
  }

  onDelete(selectedTicketCode : string) {
    
    this.sharedService.passMessage({message : 'Delete' , ticketCode : selectedTicketCode})
    let dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      
      if(result === 'true' && ((this.selection.selected.length === 1) || selectedTicketCode )) {
            this.spinner.show();
            this.sqlService.getAttachments(selectedTicketCode)
            .pipe(mergeMap(filePaths => {
              return this.sqlService.deleteAttachments(filePaths)
                     .pipe(mergeMap(() => {
                       return this.sqlService.deleteTicketDetails(selectedTicketCode)
                     }))
            }))
            .subscribe( () => {
              let index = this.dataSource.data.findIndex(ticketData => ticketData.Ticketcode === selectedTicketCode)
              this.dataSource.data.splice(index,1)
              this.dataSource = new MatTableDataSource<Ticket>(this.dataSource.data)
              this.spinner.hide()
              this.selection = new SelectionModel(true, []);
              this.notificationService.openSnackBar('Deleted Successfully')
              this.dataSource.sort = this.sort
              this.dataSource.paginator = this.paginator
            })


          }  
      
    })   
  }

  onMultiDelete() {
    this.sharedService.passMessage({message : 'Delete'})
    let dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(result => {

      if(result === 'true' && this.selection.selected.length > 1) {

        this.spinner.show();
        const selectedTicketCodes : string[] = this.selection.selected.map(tickets => {
            return tickets.Ticketcode
        })
        
        this.sqlService.getAttachments(selectedTicketCodes)
        .pipe(mergeMap(filePaths => {
          return this.sqlService.deleteAttachments(filePaths)
                 .pipe(mergeMap(() => {
                   return this.sqlService.deleteTicketDetails(selectedTicketCodes)
                 }))
        })).subscribe(() => 
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
    })
  }


}    // End of Component Class
