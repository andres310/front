import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LayoutComponent } from './layout/layout.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceOrderComponent } from './vehicle/place-order/place-order.component';
import { PlaceOrderFormComponent } from './vehicle/place-order-form/place-order-form.component';
import { StatisticsComponent } from './statistics/statistics.component';



@NgModule({
  declarations: [
    LayoutComponent,
    VehicleComponent,
    VehicleFormComponent,
    PlaceOrderComponent,
    PlaceOrderFormComponent,
    StatisticsComponent
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
