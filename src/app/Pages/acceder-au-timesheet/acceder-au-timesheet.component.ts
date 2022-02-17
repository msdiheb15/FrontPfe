import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceder-au-timesheet',
  templateUrl: './acceder-au-timesheet.component.html',
  styleUrls: ['./acceder-au-timesheet.component.css']
})
export class AccederAuTimesheetComponent implements OnInit {
 showMe:boolean=false
  constructor() { }

  ngOnInit(): void {
  }
toogleTag(){
  this.showMe=!this.showMe
}
}
