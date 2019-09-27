import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient,HttpParams, HttpResponse, HttpHeaders, } from '@angular/common/http';
import { Filters } from '../models/filters';
import { Ticket } from '../models/ticketdata';




@Injectable({
    providedIn :'root'
  })

export class SqlService {

/* baseURL = "http://twnj0749shpnt03:888/" */

baseURL = "http://localhost:3000/"

/* baseURL = "http://nasy00sp13wfed1:888/" */


constructor(private http : HttpClient) { }

getServiceGroups() : Observable<Object[]> {

  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/dropdowns/servicegroups")
  .pipe(map ((response) => {
    console.log(response)
    var serviceGroup = Object.keys(response).map(key => {
        return response[key].Servicegroup
    })
    return serviceGroup
  })) 
         
}

getPopulation(serviceGroup) : Observable<Object[]> {
  let httpParams = new HttpParams().set('ServiceGroup' , serviceGroup)                    
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/dropdowns/population/",{params : httpParams})
  .pipe(map ((response) => {
    var population = Object.keys(response).map(key => {
        return response[key].Population
    })
    return population
  }))           
}

getCategory(population) :Observable<string[]> {
  let httpParams = new HttpParams().set('Population', population)
  return this.http.get<string[]>(this.baseURL+"hrportal/api/get/dropdowns/category/",{params : httpParams})
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
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/dropdowns/subcategory/",{params : httpParams})
  .pipe(map ((response) => {
    var subCategory = Object.keys(response).map(key => {
        return response[key].Subcategory
    })
    return subCategory
  })) 
}

getSearchPageTickets(filterData : Filters) : Observable<Ticket[]> {
  let httpParams = new HttpParams()
  .set('ServiceGroup',filterData.serviceGroup)
  .set('Population',filterData.population)
  .set('Category',filterData.category)
  .set('SubCategory',filterData.subCategory)
  .set('UserID',filterData.userID)
  .set('CaseNo',filterData.ticketCode)
  .set('CreatedDate',filterData.createdDate)
  return this.http.get<Ticket[]>(this.baseURL+"hrportal/api/get/tickets", {params : httpParams})
}

getDeletePageTickets(filterData : Filters) : Observable<Ticket[]> {
  let httpParams = new HttpParams()
  .set('UserID',filterData.userID)
  .set('Population',filterData.population)
  .set('CreatedDate',filterData.createdDate)
  return this.http.get<Ticket[]>(this.baseURL+"hrportal/api/get/tickets/deletetickets", {params : httpParams})
}

getFormTicketCodeDetails(ticketCode) : Observable<Object[]> {
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/tickets/form/ticketdata/"+ ticketCode +"")
}

getFormNotesDetails(ticketCode) : Observable<Object[]> { 
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/tickets/form/notesdata/"+ ticketCode +"")
}

getFormAttachmentDetails(ticketCode) : Observable<Object[]> { 
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/tickets/form/attachments/"+ ticketCode +"")
}


getDeletePageAttachments(ticketCode) : Observable<Object[]> {
  let httpParams = new HttpParams().set('TicketCodes',ticketCode)
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/tickets/attachments",{params : httpParams})
  .pipe(map ((response) => {
    var filePaths = Object.keys(response).map(key => {
        return response[key].File_Path
    })
    return filePaths
  }))
}

getDeletePagePopulation() : Observable<Object[]> {
  return this.http.get<Object[]>(this.baseURL+"hrportal/api/get/tickets/population")
  .pipe(map ((response) => {
    var population = Object.keys(response).map(key => {
        return response[key].Population
    })
    return population
  })) 
}

downloadAttachments(filePath) : Observable<any> {
  let headers = new HttpHeaders()
  .set('Content-Type', 'blob')
  let httpParams = new HttpParams()
  .set('FilePath',filePath)

  return this.http.get<any>(this.baseURL+"hrportal/api/get/attachments",{
    headers : headers,
    params  : httpParams,
    responseType : 'blob' as 'json',
    observe: 'response'   // Mandatory if you want to access the response headers
  })
}

deleteTicketDetails(ticketCodes,filePaths) : Observable<Object[]> {
  let httpParams = new HttpParams()
  .set('TicketCodes',ticketCodes)
  .set('FilePaths',filePaths)
  return this.http.delete<Object[]>(this.baseURL+"hrportal/api/delete/ticketsandattachments",{params : httpParams})
}


}  // End of Class