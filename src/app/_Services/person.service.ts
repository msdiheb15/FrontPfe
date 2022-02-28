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

  getpersons(): Observable<Person[]>{
    return this.http.get<Person[]>(this.baseURL + '/GetPerson')
  }
  getpersonById(id: any): Observable<Person> {
    return this.http.get<Person>(this.baseURL+ `/GetPersonById?id=`+id)
  }
  deleteperson(id:any){
    return this.http.delete<any>(this.baseURL +`/DeletePerson?id=`+id);
  }


  putPerson(model:any){
    return this.http.put(this.baseURL + '/EditPerson',model);
  }

}
