import { Component, OnInit } from '@angular/core';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  model :any = {};
  data: ServiceDepartment[]=[];


  exform = new FormGroup({
    libelle_service: new FormControl('',Validators.required)
  })

  get libelle_service(){return this.exform.get('libelle_service')}

  constructor(private S : ServiceDepartmentService,private _snackBar: MatSnackBar) { }

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
    this.openSnackBar(); {
      this._snackBar.open('Ajout sucessl!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }, error => {
    console.log(error)
  });
  this.getService();
  this.openSnackBar(); {
    this._snackBar.open('Ajout fail!!', 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
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
    this.getService()
    this.openSnackBar(); {
      this._snackBar.open('Delete sucessl!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  }, () => {
    this.getService()
    this.openSnackBar(); {
      this._snackBar.open('Tu ne peut pas suprimer un Service affecter a un persone !', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  });

}











openSnackBar() {
  this._snackBar.open('', '', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
}