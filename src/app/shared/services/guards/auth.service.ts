import { Injectable } from '@angular/core';
import { SharePointService } from '../sharepoint.service';
import { Observable,of } from 'rxjs';



@Injectable()
export class AuthService {
    admin          : boolean
    authentication : Observable<any>
    securityGroups : string[] = []

    constructor(private sharePointService : SharePointService) { }


     isAdmin() {

       this.sharePointService.GetUserSecurityGroups().subscribe(securityGroups => {
      
          if(securityGroups.includes("HR Portal ASC Process Leads")) {
               return this.admin = true
          }
          else {
             
              return this.admin = false
          }  
      })
      return of(this.admin)
    }


}   // End of Class