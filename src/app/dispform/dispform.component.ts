import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { PrintService } from '../shared/services/print.service';
import { SqlService } from '../shared/services/sql.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  mergeMap, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-dispform',
  templateUrl: './dispform.component.html',
  styleUrls: ['./dispform.component.css']
})
export class DispformComponent implements OnInit {

  hrPortalDispForm : FormGroup;
  ticketCode       : string;
  ticketDetails

  displayedColumns : string[] = ['date','from', 'urgent', 'to','cc', 'subject']

  casenotesdisplayedColumns :  string[] = ['type','details', 'updatedby']

  dataSource = new MatTableDataSource()
  casenotesdataSource = new MatTableDataSource()
  fileUrl: any;
  casenotesdata : { type : string, details : string, updatedby : string}[] = []
  selectedFiles : { filename : string, filepath : string}[] = []
  constructor(private formBuilder : FormBuilder,
              private sqlService  : SqlService,
              private printService : PrintService,
              private router : Router,
              private route : ActivatedRoute,
              private spinner: NgxSpinnerService,
              private renderer:Renderer2,
              private sanitizer: DomSanitizer ){ }



   emaildata = [ { date:'NA',from:'NA',urgent:'NA',to:'NA',cc:'NA',subject:'NA'}]

   @ViewChild('download') d : ElementRef;

  
  ngOnInit() {

    this.spinner.show()
    document.body.style.backgroundColor = "#EBF5FB";

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
      prfrdcommunication : [''],
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


    this.route.queryParams.pipe(
      mergeMap( params => {
      this.ticketCode = params.TicketCode
      return this.sqlService.getFormTicketCodeDetails(this.ticketCode)
    }),
      mergeMap(ticketData => {
        return this.sqlService.getFormNotesDetails(this.ticketCode)
              .pipe(map(notesData => {
                return {ticketData,notesData}
              }))
      }),
      mergeMap(ticketsandNotesData => {
        return this.sqlService.getFormAttachmentDetails(this.ticketCode)
               .pipe(map(attachmentsData => {
                 return {ticketsandNotesData,attachmentsData}
               }))
      })
    )
    .subscribe( (formData) => {
      console.log(formData)
      this.hrPortalDispForm.patchValue({
        caseno                  : formData['ticketsandNotesData'].ticketData['0'].CASE_NO,
        userid                  : formData['ticketsandNotesData'].ticketData['0'].USER_ID ?
                                  formData['ticketsandNotesData'].ticketData['0'].USER_ID : 'NA',
        employeename            : formData['ticketsandNotesData'].ticketData['0'].EMPLOYEE_NAME ?
                                  formData['ticketsandNotesData'].ticketData['0'].EMPLOYEE_NAME : 'NA',
        status                  : formData['ticketsandNotesData'].ticketData['0'].TICKET_STATUS,
        substatus               : formData['ticketsandNotesData'].ticketData['0'].SUB_STATUS,
        subject                 : formData['ticketsandNotesData'].ticketData['0'].SUBJECT,
        issue                   : formData['ticketsandNotesData'].ticketData['0'].ISSUE,
        regarding               : formData['ticketsandNotesData'].ticketData['0'].REGARDING,
        population              : formData['ticketsandNotesData'].ticketData['0'].POPULATION,
        topic                   : formData['ticketsandNotesData'].ticketData['0'].TOPIC,
        category                : formData['ticketsandNotesData'].ticketData['0'].CATEGORY,
        subcategory             : formData['ticketsandNotesData'].ticketData['0'].SUB_CATEGORY,
        secure                  : formData['ticketsandNotesData'].ticketData['0'].SECURE,
        servicegroup            : formData['ticketsandNotesData'].ticketData['0'].SERVICEGROUP,
        assignedto              : formData['ticketsandNotesData'].ticketData['0'].ASSIGNED_TO,
        sladate                 : formData['ticketsandNotesData'].ticketData['0'].SLA_DATE,
        showcasetoemployee      : formData['ticketsandNotesData'].ticketData['0'].SHOW_CASE_TO_EMPLOYEE,
        priority                : formData['ticketsandNotesData'].ticketData['0'].PRIORITY,
        reminderdate            : formData['ticketsandNotesData'].ticketData['0'].REMINDER_DATE,
        source                  : formData['ticketsandNotesData'].ticketData['0'].SOURCE,
        timespent               : formData['ticketsandNotesData'].ticketData['0'].TIME_SPENT,
        contactname             : formData['ticketsandNotesData'].ticketData['0'].CONTACT_NAME,
        email                   : formData['ticketsandNotesData'].ticketData['0'].EMAIL,
        created                 : formData['ticketsandNotesData'].ticketData['0'].CREATED,
        createdby               : formData['ticketsandNotesData'].ticketData['0'].CREATED_BY,
        lastmodified            : formData['ticketsandNotesData'].ticketData['0'].LAST_MODIFIED,
        lastmodifiedby          : formData['ticketsandNotesData'].ticketData['0'].LAST_MODIFIED_BY,
        closed                  : formData['ticketsandNotesData'].ticketData['0'].CLOSED,
        closedby                : formData['ticketsandNotesData'].ticketData['0'].CLOSED_BY,
        employeenameinfo        : formData['ticketsandNotesData'].ticketData['0'].EMPLOYEE_NAME,
        useridinfo              : formData['ticketsandNotesData'].ticketData['0'].USER_ID,
        sendcasetonextlevel     : 'NA',
        compliancedate          : 'NA',
        transfertoprovider      : 'NA',
        defectype               : 'NA',
        personalemailaddress    : 'NA',
        authorizedtocall        : 'NA',
        defectreason            : 'NA',
        rootcause               : 'NA',
        prfrdcommunication      : 'NA',
        
      })

      Object.keys(formData['ticketsandNotesData'].notesData).forEach(key => {
        const notesType       = formData['ticketsandNotesData'].notesData[key].NOTES 
        const notesDetails    = formData['ticketsandNotesData'].notesData[key].DETAILS
        const notesUpdatedBy  = formData['ticketsandNotesData'].notesData[key].UPDATED_BY
        this.casenotesdata.push({type : notesType, details : notesDetails, updatedby : notesUpdatedBy})
      })
      
      this.casenotesdataSource.data = this.casenotesdata
      this.dataSource.data          = this.emaildata 

  


      Object.keys(formData['attachmentsData']).forEach(key => {
        const attachmentTitle = formData.attachmentsData[key].TICKET_ATTATCHMENT_TITLE
        const attachmentPath  = formData.attachmentsData[key].FILE_PATH
        this.selectedFiles.push({filename : attachmentTitle, filepath : attachmentPath})
        
      })
      this.spinner.hide()
    })
  
  }   // End of OnInit

  onDownload(filename,filePath) {
    console.log(filePath)
    this.sqlService.downloadAttachments(filePath)
    .subscribe((response : any)=> {    
      var fileName = filename
      importedSaveAs(response.body, fileName)
    })
  }
  
  onPrint() {
  
    this.printService.onDataReady()
   
  }

  onClose() {
    this.router.navigate(["/search"],{relativeTo : this.route})
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  
}  // End of component
