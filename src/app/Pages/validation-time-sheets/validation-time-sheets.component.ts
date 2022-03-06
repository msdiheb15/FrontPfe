import { Component, OnInit } from '@angular/core';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';
import { PersonService } from 'src/app/_Services/person.service';
import { Person } from 'src/app/Interfaces/person';
import { TacheService } from 'src/app/_Services/tache.service';
import { Tache } from 'src/app/Interfaces/tache';
import { ProjetService } from 'src/app/_Services/projet.service';
import { Projet } from 'src/app/Interfaces/projet';
import { TimeSheet } from 'src/app/Interfaces/TimeSheet';
import { TimeSheetService } from 'src/app/_Services/timesheet.service';
@Component({
  selector: 'app-validation-time-sheets',
  templateUrl: './validation-time-sheets.component.html',
  styleUrls: ['./validation-time-sheets.component.css']
})
export class ValidationTimeSheetsComponent implements OnInit {
  dataService :ServiceDepartment[]=[];
  dataPersonne :Person[]=[];
  data:any=[];
  id_service :any
  modelTimeSheet!: TimeSheet;

  constructor(private S: ServiceDepartmentService,private PersonService:PersonService,private TimeSheetService:TimeSheetService,private ProjetService:ProjetService,private TacheService: TacheService) { }

  ngOnInit(): void {
    this.getService()
    this.GetPersonByService()
    
  }
 


  displayedColumns=
   [
    'createdNow',
    'Projet',
    'Tache',
    'discription',
    'heure_debut',
    'heure_fin',
   'Action',
  
  ];




  getService(){
    this.S.getService().subscribe(Service => {
      
      this.dataService = Service;
      
      
    }, error => {
      console.log(error)
    });
    
  }


  GetPersonByService(){
    var serviceId = ((document.getElementById("listservices") as HTMLInputElement).value);
    console.log(serviceId)
    this.PersonService.GetPersonByService(serviceId).subscribe((person: any) => {
      this.dataPersonne = person;
      console.log(person)
        }
        , (error: any) => {
      console.log(error)
    });
  }


  getTimeSheetByPerson(){
    var personId = ((document.getElementById("personId") as HTMLInputElement).value);
    this.TimeSheetService.getTimeSheet(personId).subscribe((TimeSheet: any) => {
  
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
    var personId = ((document.getElementById("personId") as HTMLInputElement).value);
    var createNowDate = ((document.getElementById("date-input") as HTMLInputElement).value);
    console.log(this.GetFormatedDate(createNowDate))
    this.TimeSheetService.getTimeSheetbyDate(this.GetFormatedDate(createNowDate), personId).subscribe((TimeSheet: any) => {
  
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

  ValidateTimeSheet(timesheet: TimeSheet){
    console.log(timesheet.validation)
    timesheet.validation = !timesheet.validation
    console.log(timesheet.validation)
    
    /*this.modelTimeSheet.createdNow = this.GetFormatedDate()
    this.modelTimeSheet.discription = timesheet.discription
    this.modelTimeSheet.fK_Projet = timesheet.fK_Projet
    this.modelTimeSheet.fK_Tache = timesheet.fK_Tache
    this.modelTimeSheet.fK_person = timesheet.fK_person
    this.modelTimeSheet.heure_debut = timesheet.heure_debut
    this.modelTimeSheet.heure_fin = timesheet.heure_fin
    this.modelTimeSheet.iD_TimesSheet = timesheet.iD_TimesSheet
    this.modelTimeSheet.validation = timesheet.validation

    this.TimeSheetService.putTimeSheet(this.modelTimeSheet).subscribe(res => {
      console.log(res)
      this.data = res;
    }, (error: any) => {
      console.log(error)
    });*/

  }

}
