import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component';
import {RouterModule} from '@angular/router';
import {PreviousRouteRecorderService} from '../services/previous-route-recorder.service';



@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: StatsComponent, canDeactivate: [PreviousRouteRecorderService]}
    ])
  ]
})
export class StatsModule { }
