import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Interfaces/person';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  person:any

 baseURL="https://localhost:5001/api/Person";
  constructor(private http: HttpClient) { }


   addPersonne(model:any){
    return this.http.post(this.baseURL + '/AddPerson',model);
  }

  getpersons(): any{
    return this.http.get(this.baseURL + '/GetPerson')
  }

  DeletePerson(id:any){
    return this.http.delete(this.baseURL + '/DeletePerson?id='+id);
  }
  UpdatePerson(model:any){
    return this.http.put(this.baseURL + '/EditPerson',model);
  }

}
