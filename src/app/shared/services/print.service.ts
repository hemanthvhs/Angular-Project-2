import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
 
  constructor(private sharedService : SharedService) {}
  
  isPrinting = false;
 

  onDataReady() {
    setTimeout(() => {
      window.print();
    });


  }


}
