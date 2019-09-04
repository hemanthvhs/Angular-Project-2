import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs';



@Injectable()
export class DataService {

   serviceURL = "https://jsonplaceholder.typicode.com/users"
    constructor(private http : HttpClient) {}

   getUsersData() : Observable<Object[]>  {
        return this.http.get<Object[]>(this.serviceURL)
    
   }
    

}