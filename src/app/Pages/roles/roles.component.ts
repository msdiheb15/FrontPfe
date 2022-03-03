import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Interfaces/role';
import { FormGroup } from '@angular/forms';
import { Validators , FormControl } from '@angular/forms';
import { RoleService } from 'src/app/_Services/role.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  model :any = {};
  data: Role[]=[];
  id : any
  id_role:any=''
  lib_role:string=''

  exform = new FormGroup({
    libelle_Role: new FormControl('',Validators.required)
  })

  
  putform = new FormGroup({
    libelle_Role: new FormControl('',Validators.required),
    iD_Role: new FormControl('', Validators.required),
  })
  
  

  get libelle_Role (){return this.exform.get('role')}
  get iD_Role (){return this.exform.get('iD_Role')}
  
 



  constructor(private RoleService:RoleService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getrole()
    

  
  }


  displayedColumns=
   ['Roles',
   'Action'
  
  ];
  addRole() {
   
    
    {console.log(this.exform.value)
      this.RoleService.addrole(this.exform.value).subscribe(reponse => {
        
        console.log(reponse)
        this.openSnackBar(); {
          this._snackBar.open('Ajout sucessl!!', 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration:3000
          });
        }
  
      console.log(this.getrole())
    
    
  }, error => {
    console.log(error)
    this.openSnackBar(); {
      this._snackBar.open('Ajout fail!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  });

}}


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
    console.log(res)
    this.getrole()
    this.openSnackBar(); {
      this._snackBar.open('Delete sucessl!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  }, () => {
    this.getrole()
    this.openSnackBar(); {
      this._snackBar.open('Tu ne peut pas suprimer un Role affecter a un persone !', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000
      });
    }
  });

}

getRoleById(id : any ):any {
  this.RoleService.getroleById(id).subscribe(res => {
    console.log(id)
    console.log(res)
    console.log(res.libelle_Role)
    this.id_role = res.iD_Role
    this.lib_role=res.libelle_Role
    return res
  }), (error: any) => {
    console.log(error)
  };
}

putrole(){
  console.log(this.putform.value )
  this.RoleService.putrole(this.putform.value).subscribe(res => {
    console.log(res)
    this.getrole() 
    
  }, error => {
    console.log(error)
  });
    
      
}


openSnackBar() {
  this._snackBar.open('', '', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
}