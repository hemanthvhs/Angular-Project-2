import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { PrintService } from '../shared/services/print.service';
import { SqlService } from '../shared/services/sql.service';

@Component({
  selector: 'app-dispform',
  templateUrl: './dispform.component.html',
  styleUrls: ['./dispform.component.css']
})
export class DispformComponent implements OnInit {

  hrPortalDispForm : FormGroup

  displayedColumns : string[] = ['date','from', 'urgent', 'to','cc', 'subject']

  casenotesdisplayedColumns :  string[] = ['type','details', 'updatedby']

  dataSource = new MatTableDataSource()
  casenotesdataSource = new MatTableDataSource()

  constructor(private formBuilder : FormBuilder,
              private printService : PrintService,
              private sqlService : SqlService){}

   casenotesdata = [
           { type : 'TestType',details : 'TestDetails',updatedby : 'TestUpdatedBy'},
           { type : 'TestType1',details : 'TestDetails1',updatedby : 'TestUpdatedBy1'} ]

   emaildata = [ { date:'16/08/2019',from:'Virat Kohli',urgent:'',to:'ab@bd.com',cc:'gh@bd.com',subject:'test-subject'} ,
                 { date:'17/08/2019',from:'Hemanth Sharma',urgent:'',to:'jh@bd.com',cc:'FB@bd.com',subject:'test-subject1'}]

  
  ngOnInit() {

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

      this.sqlService.getCaseDetails().subscribe( (data : Response) => {
        console.log(data)
      })


  }   // End of OnInit


  onPrint() {
    this.printService.onDataReady()
  }

  onClose() {
  
  }
  
}  // End of component
