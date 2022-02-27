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



  exform = new FormGroup({
    libelle_Role: new FormControl('',Validators.required)
  })
  
  

  get libelle_Role (){return this.exform.get('role')}
  
 



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
          });
        }
  
      console.log(this.getrole())
    
    
  }, error => {
    console.log(error)
    this.openSnackBar(); {
      this._snackBar.open('Ajout fail!!', 'Dismiss', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
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
putrole(id: any){
  console.log(this.exform.value , id)
  this.RoleService.putrole(this.exform.value , id).subscribe(res => {
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