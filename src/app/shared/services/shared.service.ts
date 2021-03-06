import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private messageSource   = new BehaviorSubject<Object>("");
  currentMessage          = this.messageSource.asObservable();
  

  passMessage(dialogMessage : {message: string , ticketCode ?: string, dataCount ?:number}) {
    this.messageSource.next(dialogMessage)
  }

}
