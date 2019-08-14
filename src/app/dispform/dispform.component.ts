import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'

@Component({
  selector: 'app-dispform',
  templateUrl: './dispform.component.html',
  styleUrls: ['./dispform.component.css']
})
export class DispformComponent implements OnInit {

  hrPortalDispForm : FormGroup

  constructor(private formBuilder : FormBuilder){}

   data = [
    { type : 'TestType',details : 'TestDetails',updatedby : 'TestUpdatedBy'},
    { type : 'TestType1',details : 'TestDetails1',updatedby : 'TestUpdatedBy1'}
    ]

  
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
      casenotes : this.formBuilder.array([
        this.addCaseNotesFormGroup()
      ])
    })

      this.hrPortalDispForm.setControl('casenotes',this.addExistingCaseNotes(this.data))
    
  }   // End of OnInit

  addCaseNotesFormGroup() : FormGroup {
    return this.formBuilder.group({
      type : [''],
      details : [''],
      updatedby : ['']
    })
  }

  addExistingCaseNotes(data) : FormArray {
 
    const formArray = new FormArray([])
    data.forEach(d => {
      formArray.push(this.formBuilder.group({
        type : d.type,
        details : d.details,
        updatedby : d.updatedby
      }))
    })
    return formArray
  }
  
}
