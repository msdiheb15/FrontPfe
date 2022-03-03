import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../Interfaces/tache';


@Injectable({
  providedIn: 'root'
})
export class TacheService {
    tache:any

 baseURL="https://localhost:5001/api/Tache";
  constructor(private http: HttpClient) { }


   
  addTache(model:any){
    return this.http.post(this.baseURL + '/AddTache',model);
  }

  getTache(): Observable<Tache[]>{
    return this.http.get<Tache[]>(this.baseURL+ '/GetTache')
  }
  getTacheById(id: any): Observable<Tache> {
    return this.http.get<Tache>(this.baseURL+'/GetTacheById?id='+id)
  }
  deleteTache(id: any){
    return this.http.delete<any>(this.baseURL+ '/DeleteTache?id='+id)
  }

  putTache(model:any){
    return this.http.put<any>(this.baseURL + '/EditTache',model);
  }


}
