import { Component, OnInit ,ViewChild, AfterViewInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator'
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit,AfterViewInit {

  constructor(private dataService : DataService) { }

 
  
  displayedColumns : string[] = ['name','username', 'email', 'street','suite']
  dataSource = new MatTableDataSource()
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator

  ngOnInit() {

    this.dataService.getUsersData()
    .subscribe( (data)=> {
      this.dataSource.data = data  
    })
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }


}
