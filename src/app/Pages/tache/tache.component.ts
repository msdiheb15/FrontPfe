import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/Interfaces/tache';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  model :any = {};
  data: Tache[]=[];

  exform = new FormGroup({
    nom_tache: new FormControl('', Validators.required),
    description : new FormControl('', Validators.required)
  })

 get service_departement(){return this.exform.get('service_departement')}
 get nom_tache(){return this.exform.get('nom_tache')}
 get description(){return this.exform.get('description')}

  constructor() { }

  ngOnInit(): void {
      
  }
  
  ELEMENT_DATA: Tache[] = [
    { ID_Taches: '1',
    Service: 'marketing',
    Nom_Tache: 'PFE',
    Description_Tache: 'tres urgent',},

  ];
  
  dataSource = this.ELEMENT_DATA;


  displayedColumns=
   ['Service',
   'Tache',
   'Description Tache',
   'Action'
  
  ];

}
