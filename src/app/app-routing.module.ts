import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
