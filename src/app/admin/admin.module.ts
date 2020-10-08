import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {PreviousRouteRecorderService} from '../services/previous-route-recorder.service';
import {SharedModule} from '../shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminComponent, canDeactivate: [PreviousRouteRecorderService]}
    ]),
    SharedModule
  ]
})
export class AdminModule { }
