import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Projet } from 'src/app/Interfaces/projet';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { ProjetService } from 'src/app/_Services/projet.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  dataService :ServiceDepartment[]=[];
  data: Projet[]=[];
  id_projet:any=''
  lib_projet:string=''

  exform = new FormGroup({
    nom_Client : new FormControl('', Validators.required),
    nom_Projet : new FormControl('',Validators.required),
    etat_projet : new FormControl('',Validators.required),
    description_projet : new FormControl('',Validators.required),
    debut_estime : new FormControl('', Validators.required),
    fin_estime : new FormControl('', Validators.required),
    debut_estimej : new FormControl('', Validators.required),
    fin_estimej : new FormControl('', Validators.required),
    fk_serviceDepartment : new FormControl('', Validators.required)
  })

  putform = new FormGroup({
    iD_Projet: new FormControl('',Validators.required),
    nom_Client : new FormControl('', Validators.required),
    nom_Projet : new FormControl('',Validators.required),
    etat_projet : new FormControl('',Validators.required),
    description_projet : new FormControl('',Validators.required),
    debut_estime : new FormControl('', Validators.required),
    fin_estime : new FormControl('', Validators.required),
    debut_estimej : new FormControl('', Validators.required),
    fin_estimej : new FormControl('', Validators.required),
    fk_serviceDepartment : new FormControl('', Validators.required)
  })







 get nom_Client(){return this.exform.get('Nom_Client')}
 get nom_Projet(){return this.exform.get('Nom_Projet')}
 get description_projet(){return this.exform.get('description_projet')}
 get etat_projet(){return this.exform.get('etat_projet')}
 get debut_estime(){return this.exform.get('debut_estime')}
 get fin_estime(){return this.exform.get('fin_estime')}
 get debut_estimej(){return this.exform.get('debut_estimej')}
 get fin_estimej(){return this.exform.get('fin_estimej')}
 get fk_serviceDepartment(){return this.exform.get('fk_serviceDepartment')}

  constructor(private ProjetService:ProjetService , private S: ServiceDepartmentService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getprojet()
    this.getService()
      
  }






  displayedColumns=
   ['Service',
   'Nom Projet',
   'Description',
   'Nom Client' ,
   'Etat_projet',
   'Date Estime',
   'Date debut estime',
   'Action'
  
  ];
 
  applyFilter(event :Event){


    
  }

  getService(){
    this.S.getService().subscribe(Service => {
      this.dataService = Service;
      
    }, error => {
      console.log(error)
    });
    
  }

  addProjet(){
    console.log(this.exform.value)
  
    this.ProjetService.addprojet(this.exform.value).subscribe(rep =>{
      console.log(rep)
      console.log(this.getprojet())

    }, error => {
      console.log(error)
    });
  
  }

  getprojet(){
    this.ProjetService.getprojet().subscribe(projet => {

      this.data = projet;

      this.data.map((p: Projet) =>{
        this.S.getServiceById(p.fK_ServiceDepartment).subscribe(res => {
          p.serviceDepartment = res.libelle_service
          console.log(res.libelle_service)
          console.log(this.data)
        })
  
      })
      this.exform.reset();
      console.log(this.data)
    }, error => {
      console.log(error)
    });

  }

  getprojetById(id : any ):any {
  this.ProjetService.getprojetById(id).subscribe(res => {
    console.log(id)
    console.log(res)
    this.id_projet = res.iD_Projet
    this.lib_projet = res.nom_Projet

    return res
  }), (error: any) => {
    console.log(error)
  };
}

putprojet(){
  console.log(this.putform.value )
  this.ProjetService.putprojet(this.putform.value).subscribe(res => {
    console.log(res)
    this.getprojet() 
    
  }, error => {
    console.log(error)
  });
    
      
}


  DeleteProjet(id : any){
    this.ProjetService.deleteprojet(id).subscribe(res => {
      this.getprojet();
      this.openSnackBar(); {
        this._snackBar.open('Delete sucessl!!', 'Dismiss', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:3000
        });
      }
    }, error=> {
      console.log(error)
      this.getprojet();
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
