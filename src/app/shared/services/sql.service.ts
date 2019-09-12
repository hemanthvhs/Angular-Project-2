import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpParams, HttpResponse } from '@angular/common/http';
import { Filters } from '../models/filters';
import { Ticket } from '../models/ticketdata';




@Injectable({
    providedIn :'root'
  })

export class SqlService {

baseURL = "http://twnj0749shpnt03:888"

constructor(private http : HttpClient) { }

getServiceGroups() : Observable<Object[]> {
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/getdropdowns/servicegroups")
  .pipe(map ((response) => {
    var serviceGroup = Object.keys(response).map(key => {
        return response[key].Servicegroup
    })
    return serviceGroup
  })) 
         
}

getPopulation(serviceGroup) : Observable<Object[]> {
  let httpParams = new HttpParams().set('ServiceGroup' , serviceGroup)                    
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/getdropdowns/population/",{params : httpParams})
  .pipe(map ((response) => {
    var population = Object.keys(response).map(key => {
        return response[key].Population
    })
    return population
  }))           
}

getCategory(population) :Observable<string[]> {
  let httpParams = new HttpParams().set('Population', population)
  return this.http.get<string[]>("http://twnj0749shpnt03:888/api/getdropdowns/category/",{params : httpParams})
  .pipe(map ((response) => {
    var category = Object.keys(response).map(key => {
        return response[key].Category
    })
    return category
  })) 
}

getSubCategory(serviceGroup,population,category) : Observable<Object[]> {
  let httpParams = new HttpParams()
  .set('ServiceGroup', serviceGroup)
  .set('Population', population)
  .set('Category', category)
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/getdropdowns/subcategory/",{params : httpParams})
  .pipe(map ((response) => {
    var subCategory = Object.keys(response).map(key => {
        return response[key].Subcategory
    })
    return subCategory
  })) 
}

getTickets(filterData : Filters) : Observable<Ticket[]> {
  let httpParams = new HttpParams()
  .set('ServiceGroup',filterData.serviceGroup)
  .set('Population',filterData.population)
  .set('Category',filterData.category)
  .set('SubCategory',filterData.subCategory)
  return this.http.get<Ticket[]>("http://twnj0749shpnt03:888/api/gettickets", {params : httpParams})
}

getTicketCodeDetails(ticketCode) : Observable<Object[]> {
  
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/gettickets/"+ ticketCode +"")

}

getAttachments(ticketCode) : Observable<Object[]> {
  console.log(ticketCode)
  let httpParams = new HttpParams().set('TicketCodes',ticketCode)
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/gettickets/attachments/",{params : httpParams})
  
}


deleteTicketDetails(ticketCodes) : Observable<Object[]> {
  let httpParams = new HttpParams().set('TicketCodes',ticketCodes)
  return this.http.delete<Object[]>("http://twnj0749shpnt03:888/api/deletetickets",{params : httpParams})
}

deleteAttachments(filePaths) : Observable<Object[]> {
  let httpParams = new HttpParams().set('FilePaths',filePaths)
  return this.http.delete<Object[]>("http://twnj0749shpnt03:888/api/deletetickets/attachments",{params : httpParams})
}

       

}  // End of Class