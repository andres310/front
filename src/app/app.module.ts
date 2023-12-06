import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
