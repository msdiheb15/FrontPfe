import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  persons: any
  title = 'Poulina';



  constructor(private http: HttpClient) { }



  ngOnInit(){
    this.getPersons()
  }

  getPersons() {
    this.http.get("https://localhost:5001/api/Person/GetPerson").subscribe(reponse => {
      this.persons = reponse
      console.log(reponse)
    }, error => {
      console.log(error)
    });
    

  }






  
}
