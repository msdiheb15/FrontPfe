import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../Interfaces/tache';


@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
    TimeSheet:any

 baseURL="https://localhost:5001/api/Tache";
  constructor(private http: HttpClient) { }


   addTache(model:any){
    return this.http.post(this.baseURL +'/AddTache',model);
  }

  getTache(): Observable<Tache[]>{
    return this.http.get<Tache[]>(this.baseURL +'/GetTache')
  }

  DeleteTache(model:any){
    return this.http.delete(this.baseURL + '/DeleteTache',model);
  }
  UpdateTache(model:any){
    return this.http.put(this.baseURL + '/EditTache',model);
  }

}
