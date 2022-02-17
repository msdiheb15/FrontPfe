import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showTime = false ;
  showPara = false ;
  showPro = false ;
  showVal = false ;
  constructor() { }

  ngOnInit(): void {
  }
  show_time(){
    this.showTime = !this.showTime
  }
  show_para(){
    this.showPara = !this.showPara
  }
  show_pro(){
    this.showPro = !this.showPro
  }
  show_val(){
    this.showVal = !this.showVal
  }
}
