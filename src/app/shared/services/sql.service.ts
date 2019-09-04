import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpParams, HttpResponse } from '@angular/common/http';
import { Filters } from '../models/filters';




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
  const httpParams = new HttpParams().set('ServiceGroup' , serviceGroup)                    
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/getdropdowns/population/",{params : httpParams})
  .pipe(map ((response) => {
    var population = Object.keys(response).map(key => {
        return response[key].Population
    })
    return population
  }))           
}

getCategory(population) :Observable<string[]> {
  const httpParams = new HttpParams().set('Population', population)
  return this.http.get<string[]>("http://twnj0749shpnt03:888/api/getdropdowns/category/",{params : httpParams})
  .pipe(map ((response) => {
    var category = Object.keys(response).map(key => {
        return response[key].Category
    })
    return category
  })) 
}

getSubCategory(category) : Observable<Object[]> {
  const httpParams = new HttpParams().set('Category', category)
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/getdropdowns/subcategory/",{params : httpParams})
  .pipe(map ((response) => {
    var subCategory = Object.keys(response).map(key => {
        return response[key].Subcategory
    })
    return subCategory
  })) 
}

getTickets(filterData : Filters) : Observable<Object[]> {
  let httpParams = new HttpParams()
  .set('ServiceGroup',filterData.serviceGroup)
  .set('Population',filterData.population)
  .set('Category',filterData.category)
  .set('SubCategory',filterData.subCategory)
  console.log(filterData)
  return this.http.get<Object[]>("http://twnj0749shpnt03:888/api/gettickets", {params : httpParams})
}

         


}  // End of Class