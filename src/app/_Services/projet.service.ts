import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Projet} from '../Interfaces/projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  person:any

 baseURL="https://localhost:5001/api/projet";
  constructor(private http: HttpClient) { }

  addProjet(model:any){
    return this.http.post(this.baseURL + '/AddProjet',model);
  }

  getprojet(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.baseURL)
  }

}