import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LayoutComponent } from './layout/layout.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent,
    VehicleComponent,
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
