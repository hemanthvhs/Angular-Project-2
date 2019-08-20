import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn :'root'
  })

export class SqlService {

constructor(private http : HttpClient) { }

getCaseDetails():Observable<any> {

    return this.http.get<any>("http://localhost:3000/info")
    

}

}  // End of Class