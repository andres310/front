import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { PlaceOrderComponent } from './vehicle/place-order/place-order.component';
import { PlaceOrderFormComponent } from './vehicle/place-order-form/place-order-form.component';

export const routes: Routes = [
  {
    path: 'vehicles', component: VehicleComponent, children: [
      { path: 'new', component: VehicleFormComponent },
      { path: 'edit/:id', component: VehicleFormComponent }
    ],
  },
  {
    path: 'orders', component: PlaceOrderComponent, children: [
      { path: 'new/:userId', component: PlaceOrderFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
