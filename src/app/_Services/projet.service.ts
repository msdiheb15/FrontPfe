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

 
  addprojet(model:any){
    return this.http.post(this.baseURL + '/AddProjet',model);
  }

  getprojet(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.baseURL + '/GetProjet')
  }
  getprojetById(id: any): Observable<Projet> {
    return this.http.get<Projet>(this.baseURL+ `/GetProjetById?id=`+id)
  }
  deleteprojet(id:any){
    return this.http.delete<any>(this.baseURL +`/DeleteProjet?id=`+id);
  }

  putprojet(model:any){
    return this.http.put(this.baseURL + '/EditProjet',model);
  }
}