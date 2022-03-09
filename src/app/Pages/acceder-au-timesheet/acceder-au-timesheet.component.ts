import { Component, OnInit } from '@angular/core';

import {formatDate} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { TacheService } from 'src/app/_Services/tache.service';
import { Tache } from 'src/app/Interfaces/tache';
import { ProjetService } from 'src/app/_Services/projet.service';
import { Projet } from 'src/app/Interfaces/projet';
import { TimeSheet } from 'src/app/Interfaces/TimeSheet';
import { TimeSheetService } from 'src/app/_Services/timesheet.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-acceder-au-timesheet',
  templateUrl: './acceder-au-timesheet.component.html',
  styleUrls: ['./acceder-au-timesheet.component.css']
})
export class AccederAuTimesheetComponent implements OnInit {
 showMe:boolean=false

 dataprojet :Projet[]=[];
 datatache : Tache[]=[];
 data :any=[];
 statutache:any





 exform = new FormGroup({
  heure_debut: new FormControl('',Validators.required),
  heure_fin: new FormControl('', Validators.required),
  description : new FormControl('',Validators.required),
  fk_Projet : new FormControl('',Validators.required),
  fk_Tache : new FormControl('',Validators.required),
  fK_Person : new FormControl('96006837-D34B-43C1-5B68-08DA002B04D1'),
  validation : new FormControl(false),
  createdNow: new FormControl(formatDate(new Date(), 'dd/MM/yyyy', 'en')),
})

get heure_debut(){return this.exform.get('heure_debut')}
get heure_fin(){return this.exform.get('heure_fin')}
get description(){return this.exform.get('description')}
get password(){return this.exform.get('password')}
get fk_Projet(){return this.exform.get('fk_Projet')}
get fk_Tache(){return this.exform.get('fk_Tache')}
get fK_Person(){return this.exform.get('fK_Person')}
get validation(){return this.exform.get('validation')}
get createdNow(){return this.exform.get('createdNow')}


creatnowform = new FormGroup({
  creatnow: new FormControl(''),

})
get creatnow(){return this.exform.get('creatnow')}




  constructor(private TimeSheetService:TimeSheetService,private ProjetService:ProjetService,private TacheService: TacheService) { }

  ngOnInit() {

    this.getprojet()
    this.getTache()
    this.getTimeSheet()
  
  }
  
  displayedColumns=
   [
    'createdNow',
    'Projet',
    'Tache',
    'discription',
    'heure_debut',
    'heure_fin',
    'status',
   'Action',
  
  ];

  toogleTag(){
    this.showMe=!this.showMe
  }

  getprojet(){
    this.ProjetService.getprojet().subscribe(projet => {
      this.dataprojet = projet;
      
    }, error => {
      console.log(error)
    });
  }
  
  getTache(){
    this.TacheService.getTache().subscribe(tache => {
      this.datatache = tache;
      
    }, error => {
      console.log(error)
    });
    
  }



  addTimeSheet() {
    console.log(this.exform.value)
    this.TimeSheetService.addTimeSheet(this.exform.value).subscribe(reponse => {
      console.log(reponse)
    console.log(this.getTimeSheet())
    this.exform.reset();
  }, error => {
    console.log(error)
  });
  }



  getTimeSheet(){
    this.TimeSheetService.getTimeSheet('63D57BCA-4676-4FAF-9848-08D9FDD98EEA').subscribe((TimeSheet: any) => {
  
    this.data = TimeSheet;
     console.log(this.data)

     this.data.map((p: TimeSheet) =>{
      this.ProjetService.getprojetById(p.fK_Projet).subscribe(res => {
        p.projet = res.nom_Projet
        console.log(p)
      })
      this.TacheService.getTacheById(p.fK_Tache).subscribe(res => {
        p.tache = res.nom_tache
        console.log(p)
      })
    })
    


     }, (error: any) => {
    console.log(error)
  });
      
  }


  getTimeSheetbydate(){
    var createNowDate = ((document.getElementById("date-input") as HTMLInputElement).value);
    console.log(this.GetFormatedDate(createNowDate))
    this.TimeSheetService.getTimeSheetbyDate(this.GetFormatedDate(createNowDate), "63D57BCA-4676-4FAF-9848-08D9FDD98EEA").subscribe((TimeSheet: any) => {
  
    this.data = TimeSheet;
     console.log(this.data)

     this.data.map((p: TimeSheet) =>{
      this.ProjetService.getprojetById(p.fK_Projet).subscribe(res => {
        p.projet = res.nom_Projet
        console.log(p)
      })
      this.TacheService.getTacheById(p.fK_Tache).subscribe(res => {
        p.tache = res.nom_tache
        console.log(p)
      })
    })
    


     }, (error: any) => {
    console.log(error)
  });
      
  }

  GetFormatedDate(date: string)
    {
        return date.split('-').reverse().join("/"); // Reverse the date
    }




    DeleteTimesheet(id : any){
      this.TimeSheetService.DeleteTimeSheet(id).subscribe(res => {
        this.getTimeSheet();
        
      }, error=> {
        console.log(error)
        this.getTimeSheet();
        
      });



      
    
    }
   



















}
