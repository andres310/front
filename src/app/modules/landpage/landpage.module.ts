import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandpageRoutingModule } from './landpage-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LandpageRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class LandpageModule { }
