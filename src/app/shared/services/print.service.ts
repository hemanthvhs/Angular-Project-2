import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  onDataReady() {
    setTimeout(() => {
      window.print();
    });
  }
}
