import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccederAuTimesheetComponent } from './Pages/acceder-au-timesheet/acceder-au-timesheet.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginFormComponent } from './Pages/login-form/login-form.component';
import { PersonnesComponent } from './Pages/personnes/personnes.component';
import { ProjectsComponent } from './Pages/projects/projects.component';
import { RolesComponent } from './Pages/roles/roles.component';
import { ServicesComponent } from './Pages/services/services.component';
import { TacheComponent } from './Pages/tache/tache.component';
import { ValidationTimeSheetsComponent } from './Pages/validation-time-sheets/validation-time-sheets.component';





const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{ path: '', component: HomeComponent }]
  },
  {
    path: 'acceder-au-timesheet',
    component: DashboardComponent,
    children: [{ path: '', component: AccederAuTimesheetComponent }]
  },
  {
    path: 'personnes',
    component: DashboardComponent,
    children: [{ path: '', component: PersonnesComponent }]
  }
  ,
  {
    path: 'projects',
    component: DashboardComponent,
    children: [{ path: '', component: ProjectsComponent }]
  }
  ,
  {
    path: 'tache',
    component: DashboardComponent,
    children: [{ path: '', component: TacheComponent }]
  }
  , {
    path: 'roles',
    component: DashboardComponent,
    children: [{ path: '', component: RolesComponent }]
  }
  , {
    path: 'services',
    component: DashboardComponent,
    children: [{ path: '', component: ServicesComponent }]
  }
  , {
    path: 'validation-timesheet',
    component: DashboardComponent,
    children: [{ path: '', component: ValidationTimeSheetsComponent }]
  }



  , {
    path: '',
    component: LoginFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
