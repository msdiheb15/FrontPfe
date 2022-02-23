import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Projet} from '../Interfaces/projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  projet:any

 baseURL="https://localhost:5001/api/Projet";
  constructor(private http: HttpClient) { }

  addProjet(model:any){
    return this.http.post(this.baseURL +'/AddProjet',model);
  }

  getprojet(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.baseURL +'/GetProjet')
  }

  Deleteprojet(model:any){
    return this.http.delete(this.baseURL + '/DeleteProjet',model);
  }
  Updateprojet(model:any){
    return this.http.put(this.baseURL + '/EditProjet',model);
  }
}