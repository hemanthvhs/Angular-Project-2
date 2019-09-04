import { Component, OnInit ,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator'
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
              private dataService : DataService,
              private sqlService  : SqlService,
              private notificationService : NotificationService,
              private sharedService : SharedService,
              private dialog : MatDialog,
              private router : Router,
              private route  : ActivatedRoute) { }

  
  displayedColumns : string[] = ['select','Ticketcode','actions','USER_NAME','Priority','ServiceGroup','Population','Category','SubCategory','Email','CreatedDateTime','Closed_Date_Time']
  dataSource = new MatTableDataSource()
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator
  @ViewChild('drawer') drawer : MatSidenav

  ngOnInit() {

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
    
  }

  get category() : FormControl {
    return this.searchForm.get('category') as FormControl
  }

  get subcategory() : FormControl {
    return this.searchForm.get('subcategory') as FormControl
  }

  onServiceGroupChange(serviceGroup : string) {
    this.searchForm.get('population').patchValue('')
    this.population$ = this.sqlService.getPopulation(serviceGroup)
  }

  onPopulationChange(population : string) {
    this.searchForm.get('category').patchValue('')
    this.sqlService.getCategory(population).subscribe(categories => {
      this.categories = categories
    })
  }

  onCategoryChange(category : string) {
    this.searchForm.get('subcategory').patchValue('')
    this.subCategory$ = this.sqlService.getSubCategory(category)
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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.filterData.serviceGroup = this.searchForm.get('servicegroup').value
    this.filterData.population   = this.searchForm.get('population').value
    this.filterData.category     = this.searchForm.get('category').value
    this.filterData.subCategory  = this.searchForm.get('subcategory').value

    if(this.searchForm.get('servicegroup').value) {
            this.drawer.toggle()
            this.sqlService.getTickets(this.filterData).subscribe( ticketData => {
              this.dataSource.data = ticketData
            })
          }
    
    else {
      this.sharedService.passMessage({message : "Atleast one filter is required"})
      let dialogRef = this.dialog.open(DialogComponent)
      
    }
  }

  onLaunch(ticketID) { 
    console.log(ticketID)
      this.router.navigate(["/search","form",ticketID,"readonly"], {relativeTo:this.route})
    
  }

  onDelete() {
    this.sharedService.passMessage({message : 'Delete' , caseNo : 'VKVJS03'})
    let dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'true') {
        this.notificationService.openSnackBar('Deleted Successfully')
      }
    })   
  }

}
