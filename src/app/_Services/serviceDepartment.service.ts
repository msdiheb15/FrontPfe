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

  DeleteService(id: any){
    return this.http.delete(this.baseURL + '/DeleteServiceDepartment?id='+id);
  }
   putService(model:any,id: any){
    return this.http.put(this.baseURL + '/EditServiceDepartment'+id ,model);
  }
  getServiceById(id: any): Observable<ServiceDepartment> {
    return this.http.get<ServiceDepartment>(this.baseURL+ `/GetServiceDepartmentById?id=`+id)
  }

}
