
import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/Interfaces/person';
import { PersonService } from 'src/app/_Services/person.service';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { RoleService } from 'src/app/_Services/role.service';
import { Role } from 'src/app/Interfaces/role';
import { ServiceDepartmentService } from 'src/app/_Services/serviceDepartment.service';
import { ServiceDepartment } from 'src/app/Interfaces/ServiceDepartment';


@Component({
  selector: 'app-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {
  tab:any = []
  data:any=[];
  hide = true;
  dataRole: Role[]=[];
  dataService :ServiceDepartment[]=[];
  exform = new FormGroup({
    FirstName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required),
    login : new FormControl('', [Validators.email , Validators.required]),
    password : new FormControl('',Validators.required),
    cin : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]),
    adresse : new FormControl('', Validators.required),
    fk_serviceDepartment: new FormControl('',Validators.required),
    fk_Role : new FormControl('',Validators.required),
    Activation : new FormControl('')
    
  })

 get FirstName(){return this.exform.get('first_name')}
 get lastName(){return this.exform.get('last_name')}
 get login(){return this.exform.get('login')}
 get password(){return this.exform.get('password')}
 get cin(){return this.exform.get('cin')}
 get adresse(){return this.exform.get('adresse')}
 get fk_serviceDepartment(){return this.exform.get('serviceDepartment')}
 get fk_Role(){return this.exform.get('role')}
 get Activation(){return this.exform.get('Activition')}
  
  constructor(private PersonService:PersonService  , private RoleService : RoleService , private S : ServiceDepartmentService) { }

  ngOnInit(): void {
    this.getrole()
    this.getService()
    this.getPerson();
    
  }
   

  
  displayedColumns=
   ['FirstName',
   'LastName',
   'Cin' ,
   'Adresse',
   'Activation',
   'Role',
   'ServiceDepartment',
  'Action',
  ];

  dataSource = new MatTableDataSource(this.data);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter(() =>
      this.dataSource.filter = filterValue.trim().toLowerCase());
  }

  addPersonne() {
    console.log(this.exform.value)
  
    this.PersonService.addPersonne(this.exform.value).subscribe(reponse => {
      
      console.log(reponse)
      

    console.log(this.getPerson())
  }, error => {
    console.log(error)
  });
  }


  getAllPersons(i : any){
    var tab = this.dataRole.filter( x => {
      return x.iD_Role == i
    })
    this.tab.push(tab[0])
    console.log(this.tab)
     
  }


getPerson(){
  this.PersonService.getpersons().subscribe((person: any[]) => {
  
    this.data = person;
  // console.log( this.RoleService.getroleById(person[0].fk_Role))
   
    
    console.log((this.data[1].fK_Role))
  
    this.data.map((i: any) => {
    this.getAllPersons(i.fK_Role)
    })



     

    

  
  }, (error: any) => {
    console.log(error)
  });
}

getrole(){
  this.RoleService.getrole().subscribe(Role => {
    this.dataRole = Role;
    
  }, error => {
    console.log(error)
  });
}

getService(){
  this.S.getService().subscribe(Service => {
    this.dataService = Service;
    
  }, error => {
    console.log(error)
  });
  
}
getRoleById(id : any ):any {
    this.RoleService.getroleById(id).subscribe(res => {
      
      return res
    })
}

}
