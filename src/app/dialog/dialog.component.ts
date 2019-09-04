import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  message : string ;
  caseNo  : string ;
 
  constructor(public sharedService : SharedService) { }

  ngOnInit() {
 
    this.sharedService.currentMessage
    .subscribe( (dialogObject : any) => {
        this.message = dialogObject.message;
        this.caseNo  = dialogObject.caseNo ;
    })
  }

  

}
