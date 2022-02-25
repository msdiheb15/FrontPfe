import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Interfaces/role';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { RoleService } from 'src/app/_Services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  model :any = {};
  data: Role[]=[];
  exform = new FormGroup({
    libelle_Role: new FormControl('',Validators.required)
  })

  get libelle_Role (){return this.exform.get('role')}

  constructor(private RoleService:RoleService) { }

  ngOnInit(): void {
    this.getrole()
  
  }


  displayedColumns=
   ['Roles',
   'Action'
  
  ];
  addRole() {
    console.log(this.exform.value)
    this.RoleService.addrole(this.exform.value).subscribe(reponse => {
      
      console.log(reponse)
      

    console.log(this.getrole())
  }, error => {
    console.log(error)
  });

}


getrole(){
  this.RoleService.getrole().subscribe(Role => {
    this.data = Role;
    console.log(this.data)
  }, error => {
    console.log(error)
  });
}

deleteRole(id : any ){

  this.RoleService.deleterole(id).subscribe(res => {
    this.getrole()
  }, () => {
    this.getrole()
  });

}
}
