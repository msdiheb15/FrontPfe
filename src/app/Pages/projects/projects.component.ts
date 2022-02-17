import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ProjetService } from 'src/app/_Services/projet.service';
import { Projet } from 'src/app/Interfaces/projet';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  model :any = {};
  data: Projet[]=[];

  exform = new FormGroup({
    marketing: new FormControl('',Validators.required),
    procedures_marketing: new FormControl('', Validators.required),
    pgh : new FormControl('', Validators.required),
    description_projet : new FormControl('',Validators.required),
    date_Debut_E : new FormControl('', Validators.required),
    date_Debut_R : new FormControl('', Validators.required),
    dure_E : new FormControl('', Validators.required),
    dure_R : new FormControl('', Validators.required)
  })

 get marketing(){return this.exform.get('marketing')}
 get procedures_marketing(){return this.exform.get('procedures_marketing')}
 get pgh(){return this.exform.get('pgh')}
 get description_projet(){return this.exform.get('description_projet')}
 get date_Debut_E(){return this.exform.get('date_Debut_E')}
 get date_Debut_R(){return this.exform.get('date_Debut_R')}
 get dure_E(){return this.exform.get('dure_E')}
 get dure_R(){return this.exform.get('dure_R')}

  constructor(private ProjetService:ProjetService) { }

  ngOnInit(): void {
      
  }



  ELEMENT_DATA: Projet[] = [
    {ID_Projet: '1',
    Service: 'marketig',
    Nom_Projet: 'PFE',
    Nom_Client: 'cyrine',
    Cloture: 'no',
    debut_estime:'13/9/200',
    fin_estime:'13/9/200'
  },
    
  ];
  dataSource = this.ELEMENT_DATA;

  displayedColumns=
   ['Service',
   'Nom Projet',
   'Nom Client' ,
   'Cloture',
   'Date Estime',
   'Date debut estime',
   'Action'
  
  ];
  applyFilter(event: Event) {}

}
