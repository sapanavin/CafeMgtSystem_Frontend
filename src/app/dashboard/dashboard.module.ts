import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
