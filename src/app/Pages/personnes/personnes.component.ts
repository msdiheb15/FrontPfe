
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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tab:any = []
  data:any=[];
  hide = true;
  dataRole: Role[]=[];
  dataService :ServiceDepartment[]=[];
  userRole: string = ""
  id_person:any=''
  lib_FirstName:string=''


  
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

  putform = new FormGroup({
    iD_person: new FormControl('',Validators.required),
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


 
  
  constructor(private PersonService:PersonService  , private RoleService : RoleService , private S : ServiceDepartmentService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getrole()
    this.getService()
    this.getPerson() 
 
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





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter((i: any) =>
    {
    
  let arr = Object.keys(this.data).map((k) => this.data[k])
      arr[i].filter = filterValue.toLowerCase()
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




  addPersonne() {
    console.log(this.exform.value)
    this.PersonService.addPersonne(this.exform.value).subscribe(reponse => {
      console.log(reponse)
    console.log(this.getPerson())
  }, error => {
    console.log(error)
  });
  }


 
getPerson(){
  this.PersonService.getpersons().subscribe((person: any) => {
  
    this.data = person;

    this.data.map((p: Person) =>{
      this.RoleService.getroleById(p.fK_Role).subscribe(res => {
        p.role = res.libelle_Role
        console.log(p)
      })
      this.S.getServiceById(p.fK_ServiceDepartment).subscribe(res => {
        p.service = res.libelle_service
        console.log(p)
      })

    })
    this.exform.reset();
    return this.data


     }, (error: any) => {
    console.log(error)
  });
}

getpersonById(id : any ):any {
  this.PersonService.getpersonById(id).subscribe(res => {
    console.log(id)
    console.log(res)
    this.id_person = res.iD_person
    this.lib_FirstName = res.firstName

    return res
  }), (error: any) => {
    console.log(error)
  };
}


putPerson(){
  console.log(this.putform.value )
  this.PersonService.putPerson(this.putform.value).subscribe(res => {
    console.log(res)
    this.getPerson() 
    
  }, error => {
    console.log(error)
  });
    
      
}

DeletePerson(id : any){
  this.PersonService.deleteperson(id).subscribe(res => {
    this.getPerson();
    this.openSnackBar(); {
      this._snackBar.open('Delete sucessl!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  }, error=> {
    console.log(error)
    this.getPerson();
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


