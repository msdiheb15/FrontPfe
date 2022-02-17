import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
 

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
