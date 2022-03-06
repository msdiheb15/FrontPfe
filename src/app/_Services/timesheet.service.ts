import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSheet } from '../Interfaces/TimeSheet';


@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
    TimeSheet:any

 baseURL="https://localhost:5001/api/TimesSheet";
  constructor(private http: HttpClient) { }


  addTimeSheet(model:any){
    return this.http.post(this.baseURL + '/AddTimesSheet',model);
  }

  getTimeSheet(personId: any): Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(this.baseURL + '/GetTimesSheetByPerson?id_Person='+personId)
  }
  getTimeSheetById(id: any): Observable<TimeSheet> {
    return this.http.get<TimeSheet>(this.baseURL+ `/GetTimesSheetById?id=`+id)
  }
  getTimeSheetbyDate(date: any, personId: any): Observable<TimeSheet[]> {
    console.log(date)
    return this.http.get<TimeSheet[]>(this.baseURL+"/GetTimesSheetbyDate?date="+date+"&personId="+personId)
  }
  DeleteTimeSheet(id: any){
    return this.http.delete<any>(this.baseURL + '/DeleteTimesSheet?id='+id);
  }
   putTimeSheet(model:any){
    return this.http.put<TimeSheet[]>(this.baseURL + '/EditTimesSheet',model);
  }

}
