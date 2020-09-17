import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './components/stats/stats.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: StatsComponent}
    ])
  ]
})
export class StatsModule { }
