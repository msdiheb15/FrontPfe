import { Component, OnInit } from '@angular/core';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  model :any = {};
  data: ServiceDepartment[]=[];


  exform = new FormGroup({
    libelle_service: new FormControl('',Validators.required)
  })

  get libelle_service(){return this.exform.get('libelle_service')}

  constructor(private S : ServiceDepartmentService) { }

  ngOnInit(): void {
    this.getService();
  }


  dataSource = this.data;


  displayedColumns=
   ['libelle_service',
   'Action'
  
  ];

  addService() {
    console.log(this.exform.value)
    this.S.addService(this.exform.value).subscribe(reponse => {
      
      console.log(reponse)
      

    console.log(this.getService())
  }, error => {
    console.log(error)
  });
  this.getService();
}


getService(){
  this.S.getService().subscribe(Service => {
    this.data = Service;
    console.log(this.data)
  }, error => {
    console.log(error)
  });
  
}

deleteService(id : any ){

  this.S.DeleteService(id).subscribe(res => {
    console.log(res)
  })

}
}
