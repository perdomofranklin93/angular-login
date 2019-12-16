import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store/auth.actions';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AuthState]),
    HttpClientModule
    // NgxsStoragePluginModule.forRoot({
    //   key: 'auth.token'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
