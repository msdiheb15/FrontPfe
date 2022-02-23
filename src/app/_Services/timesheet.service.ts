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


   addTimesSheet(model:any){
    return this.http.post(this.baseURL +'/AddTimesSheet',model);
  }

  getTimesSheet(): Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(this.baseURL +'/GetTimesSheet')
  }

  DeleteTimesSheet(model:any){
    return this.http.delete(this.baseURL + '/DeleteTimesSheet',model);
  }
  UpdateTimesSheet(model:any){
    return this.http.put(this.baseURL + '/EditTimesSheet',model);
  }

}
