import { Component, OnInit ,ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatTableDataSource,MatSort, MatPaginator } from '@angular/material';
import { NotificationService } from '../shared/services/notification.service';
import { MatDialog, MatSidenav } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../shared/services/shared.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { SqlService } from '../shared/services/sql.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Filters } from '../shared/models/filters';
import { Ticket } from '../shared/models/ticketdata';
import { NgxSpinnerService } from "ngx-spinner";
import { mergeMap, tap } from 'rxjs/operators';
import { SharePointService } from '../shared/services/sharepoint.service';
import { CanComponentDeactivate } from '../shared/services/guards/can-deactivate-guard.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-searchpage',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit,AfterViewInit,CanComponentDeactivate {

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
  table                   : ElementRef;
  currentUser             : string ; 
  ticketData              : any
  fileurl
  fileUrl: any;
  

  constructor(private formBuilder : FormBuilder,
              private spinner: NgxSpinnerService,
              private sharePointService : SharePointService,
              private sqlService  : SqlService,
              private notificationService : NotificationService,
              private sharedService : SharedService,
              private dialog : MatDialog,
              private router : Router,
              private route  : ActivatedRoute, private sanitizer: DomSanitizer) { }

  
  
   displayedColumns : string[] = ['Ticketcode','actions','USER_NAME','Priority','ServiceGroup','Population','Category','SubCategory','Email','CreatedDateTime','Closed_Date_Time']
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

    document.body.style.zoom = "95%";
    this.spinner.show();

    this.sharePointService.getCurrentUserName().subscribe(currentUser => {
      this.currentUser = currentUser
    })

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.searchForm = this.formBuilder.group({
      
      servicegroup : [''],
      population   : [''],
      category     : [''],
      subcategory  : [''],
      userid       : [''],
      ticketcode   : [''],
      assignedto   : [''],
      createddate  : ['']
    })

    this.serviceGroup$ = this.sqlService.getServiceGroups()
  }  // End of OnInit

  ngAfterViewInit(){
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
    
  }

  canDeactivate() : Observable<boolean> | Promise <boolean> | boolean{
    return confirm('Existing Filters & Search Data will be lost')
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


  onSearch() {
    
    document.body.scrollTop      = document.documentElement.scrollTop = 0;

    this.filterData.serviceGroup = this.searchForm.get('servicegroup').value
    this.filterData.population   = this.searchForm.get('population').value
    this.filterData.category     = this.searchForm.get('category').value
    this.filterData.subCategory  = this.searchForm.get('subcategory').value
    this.filterData.userID       = this.searchForm.get('userid').value
    this.filterData.ticketCode   = this.searchForm.get('ticketcode').value
    this.filterData.assignedTo   = this.searchForm.get('assignedto').value
    this.filterData.createdDate  = this.searchForm.get('createddate').value ? 
                                   this.searchForm.get('createddate').value.toISOString().substring(0,10) : ''
    

    const isSearchAllowed : boolean = this.searchForm.get('ticketcode').value   ? true :
                                      this.searchForm.get('userid').value       ? true :
                                      this.searchForm.get('servicegroup').value ? true :
                                      this.searchForm.get('population').value   ? true :
                                      this.searchForm.get('category').value     ? true :
                                      this.searchForm.get('subcategory').value  ? true :
                                      this.searchForm.get('assignedto').value   ? true :
                                      this.searchForm.get('createddate').value  ? true : false

    if(isSearchAllowed) {
            this.spinner.show();
            this.drawer.toggle()
            this.sqlService.getSearchPageTickets(this.filterData).subscribe( ticketData => {
              this.ticketData = ticketData
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
    this.searchForm.get('servicegroup').patchValue('')
    this.searchForm.get('population').patchValue('')
    this.searchForm.get('category').patchValue('')
    this.searchForm.get('subcategory').patchValue('')
    this.searchForm.get('userid').patchValue('')
    this.searchForm.get('ticketcode').patchValue('')
    this.searchForm.get('assignedto').patchValue('')
    this.searchForm.get('createddate').patchValue('')
  }

  onDeleteBtnClick() {
    this.router.navigate(['/delete'],{relativeTo:this.route})
  }

  onLaunch(ticketCode : string) { 
    console.log(ticketCode)
    this.router.navigate(["form"], 
    {relativeTo:this.route,queryParams : {TicketCode : ticketCode,Mode:'ReadOnly'}})
    
  }

}    // End of Component Class
