import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceDepartment } from '../Interfaces/ServiceDepartment';


@Injectable({
  providedIn: 'root'
})
export class ServiceDepartmentService {
  ServiceDepartment:any

 baseURL="https://localhost:5001/api/ServiceDepartment";
  constructor(private http: HttpClient) { }


   addService(model:any){
    return this.http.post(this.baseURL + '/AddServiceDepartment',model);
  }

  getService(): Observable<ServiceDepartment[]>{
    return this.http.get<ServiceDepartment[]>(this.baseURL + '/GetServiceDepartment')
  }

  DeleteService(model:any){
    return this.http.delete(this.baseURL + '/DeleteServiceDepartment',model);
  }
  UpdateService(model:any){
    return this.http.put(this.baseURL + '/EditServiceDepartment',model);
  }
  getServiceById(id: any) {
    return this.http.get(this.baseURL+ `/GetServiceDepartmentById`, id)
  }

}
