import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
    providedIn :'root'
  })

export class SharePointService {


    headers : HttpHeaders = new HttpHeaders ({
        'Content-Type'    : 'application/json;odata=verbose',
        'Accept'          : 'application/json;odata=verbose'             
      })

   /*  baseURL  = "http://twnj0749shpnt03/sites/hrportalarchive/" */
    baseURL  = "http://regsharedev.bdx.com/sites/HRPortalArchival/"

    constructor(private http : HttpClient) { }

    getCurrentUserName():Observable<any> {

        
        return this.http.get<any>(this.baseURL+"_api/web/currentUser",{headers:this.headers})
        .pipe(map((response : Response) => {
          const data = response['d'].Title
          return data
          })
        )
      }

      GetUserSecurityGroups():Observable<string[]> {

        return this.http.get<string[]>(this.baseURL+"_api/web/currentuser/?$expand=groups",{headers:this.headers})
        .pipe(map((response) => {
          const data = response['d'].Groups.results
          const groups = Object.keys(data).map( key => {
              return data[key].LoginName
          })
          return groups
        })
        )
       }

    
}