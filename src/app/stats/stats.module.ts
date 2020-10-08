import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component';
import {RouterModule} from '@angular/router';
import {PreviousRouteRecorderService} from '../services/previous-route-recorder.service';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [StatsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: StatsComponent, canDeactivate: [PreviousRouteRecorderService]}
        ]),
        SharedModule
    ]
})
export class StatsModule { }
