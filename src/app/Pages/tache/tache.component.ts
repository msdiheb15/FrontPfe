import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/Interfaces/tache';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { TacheService } from 'src/app/_Services/tache.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  model :any = {};
  data: Tache[]=[];
  dataService :ServiceDepartment[]=[];
  id_tache:any=''
  lib_tache:string=''
  arrayTo : any = {}

  exform = new FormGroup({
    nom_tache: new FormControl('', Validators.required),
    discription : new FormControl('', Validators.required),
    fk_serviceDepartment : new FormControl('', Validators.required)
  })


  putform = new FormGroup({
    iD_Taches: new FormControl('',Validators.required),
    nom_tache: new FormControl('', Validators.required),
    discription : new FormControl('', Validators.required),
    fk_serviceDepartment : new FormControl('', Validators.required)
  })



 get fk_serviceDepartment(){return this.exform.get('fk_serviceDepartment')}
 get nom_tache(){return this.exform.get('nom_tache')}
 get discription(){return this.exform.get('discription')}

  constructor(private TacheService:TacheService,private S: ServiceDepartmentService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTache()
    this.getService()
      
  }
  

  



  displayedColumns=
   ['Service',
   'Tache',
   'Description Tache',
   'Action'
  
  ];



  getService(){
    this.S.getService().subscribe(Service => {
      this.dataService = Service;
      
    }, error => {
      console.log(error)
    });
    
  }
  addTache(){
    console.log(this.exform.value)
  
    this.TacheService.addTache(this.exform.value).subscribe(rep =>{
      console.log(rep)
      console.log(this.getTache())
      this.exform.reset();

    }, error => {
      console.log(error)
    });
  
  }
  getTache(){
    this.TacheService.getTache().subscribe(tache => {

      this.data = tache;

      this.data.map((p: Tache) =>{
        this.S.getServiceById(p.fK_ServiceDepartment).subscribe(res => {
          p.serviceDepartment = res.libelle_service
          console.log(res.libelle_service)
          console.log(this.data)
        })
  
      })
      
      console.log(this.data)
    }, error => {
      console.log(error)
    });

  }
  getTacheById(id : any ):any {
    this.TacheService.getTacheById(id).subscribe(res => {
      this.arrayTo = {}
      console.log(id)
      console.log(res)
      this.id_tache = res.iD_Taches
      this.lib_tache = res.nom_tache
      this.arrayTo = res 
  
      return res
    }), (error: any) => {
      console.log(error)
    };
  }

  putTache(){
    console.log(this.putform.value )
    this.TacheService.putTache(this.putform.value).subscribe(res => {
      console.log(res)
      this.getTache() 
      
    }, error => {
      console.log(error)
    });
      
        
  }
  
  deleteTache(id : any){
    this.TacheService.deleteTache(id).subscribe(res => {
      this.getTache();
      this.openSnackBar(); {
        this._snackBar.open('Delete sucessl!!', 'Dismiss', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:3000
        });
      }
    }, error=> {
      console.log(error)
      this.getTache();
      this.openSnackBar(); {
        this._snackBar.open('error !', 'Dismiss', {
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
