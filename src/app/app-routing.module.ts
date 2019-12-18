import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { UbicationGuard } from './guards/ubication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UbicationGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, 
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
