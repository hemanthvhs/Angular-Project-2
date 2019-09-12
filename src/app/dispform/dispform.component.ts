import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { PrintService } from '../shared/services/print.service';
import { SqlService } from '../shared/services/sql.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  mergeMap, map } from 'rxjs/operators'

@Component({
  selector: 'app-dispform',
  templateUrl: './dispform.component.html',
  styleUrls: ['./dispform.component.css']
})
export class DispformComponent implements OnInit {

  hrPortalDispForm : FormGroup;
  ticketCode       : string

  displayedColumns : string[] = ['date','from', 'urgent', 'to','cc', 'subject']

  casenotesdisplayedColumns :  string[] = ['type','details', 'updatedby']

  dataSource = new MatTableDataSource()
  casenotesdataSource = new MatTableDataSource()

  constructor(private formBuilder : FormBuilder,
              private sqlService  : SqlService,
              private printService : PrintService,
              private router : Router,
              private route : ActivatedRoute ){}

   casenotesdata = [
           { type : 'TestType',details : 'TestDetails',updatedby : 'TestUpdatedBy'},
           { type : 'TestType1',details : 'TestDetails1',updatedby : 'TestUpdatedBy1'} ]

   emaildata = [ { date:'16/08/2019',from:'Virat Kohli',urgent:'',to:'ab@bd.com',cc:'gh@bd.com',subject:'test-subject'} ,
                 { date:'17/08/2019',from:'Hemanth Sharma',urgent:'',to:'jh@bd.com',cc:'FB@bd.com',subject:'test-subject1'}]

  
  ngOnInit() {

    document.body.style.backgroundColor = "#EBF5FB";

    this.route.queryParams.pipe(
      mergeMap( params => {
      this.ticketCode = params.TicketCode
      return this.sqlService.getTicketCodeDetails(this.ticketCode)
    }),
    mergeMap(ticketDetails => {
      console.log("Inside 2nd merge")
      console.log(this.ticketCode)
      return this.sqlService.getAttachments(this.ticketCode)
             .pipe(map(attachmentsData => {
               return {ticketDetails,attachmentsData}
             }))
    })
    ).subscribe( (resposne) => {
      console.log(resposne)
    })
    

    this.hrPortalDispForm = this.formBuilder.group({
      caseno : [''],
      userid : [''],
      employeename : [''],
      status : [''],
      substatus : [''],
      subject : [''],
      issue : [''],
      regarding : [''],
      population :[''],
      topic : [''],
      category : [''],
      subcategory : [''],
      secure : [''],
      servicegroup : [''],
      assignedto : [''],
      sladate : [''],
      casestatus : [''],
      casesubstatus : [''],
      showcasetoemployee : [''],
      priority : [''],
      reminderdate : [''],
      source : [''],
      timespent : [''],
      sendcasetonextlevel : [''],
      transfertoprovider : [''],
      defectype : [''],
      preferredmethodofcommunication : [''],
      personalemailaddress : [''],
      authorizedtocall : [''],
      defectreason : [''],
      rootcause : [''],
      compliancedate : [''],
      scalefile : [''],
      breakfix : [''],
      employeenameinfo : [''],
      contactname : [''],
      useridinfo : [''],
      email : [''],
      created : [''],
      lastmodified : [''],
      closed : [''],
      createdby : [''],
      lastmodifiedby : [''],
      closedby : [''],

    })
     
      this.dataSource.data = this.emaildata 
      this.casenotesdataSource.data = this.casenotesdata


  }   // End of OnInit


  onPrint() {
  
    this.printService.onDataReady()
   
  }

  onClose() {
    this.router.navigate(["/search"],{relativeTo : this.route})
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  
}  // End of component
