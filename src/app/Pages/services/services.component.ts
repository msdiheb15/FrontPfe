import { Component, OnInit } from '@angular/core';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  model :any = {};
  data: ServiceDepartment[]=[];


  exform = new FormGroup({
    service_departement: new FormControl('',Validators.required)
  })

  get service_departement (){return this.exform.get('service_departement')}

  constructor() { }

  ngOnInit(): void {
  }


  ELEMENT_DATA: ServiceDepartment[] = [
    {ID_ServiceDepartment:'1',libelle_service: 'Marketing'},
  ];
  dataSource = this.ELEMENT_DATA;


  displayedColumns=
   ['libelle_service',
   'Action'
  
  ];


}
