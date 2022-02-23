import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Role} from '../Interfaces/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role:any

 baseURL="https://localhost:5001/api/Role";
  constructor(private http: HttpClient) { }

  addrole(model:any){
    return this.http.post(this.baseURL + '/AddRole',model);
  }

  getrole(): Observable<Role[]>{
    return this.http.get<Role[]>(this.baseURL+ '/GetRole')
  }
  
  deleterole(id: any){
    return this.http.delete(this.baseURL+ `/DeleteRole`, id)
  }
  getroleById(id: any) {
    return this.http.get(this.baseURL+ `/GetRoleById`, id)
  }


}