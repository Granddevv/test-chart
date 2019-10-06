import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { AnalyzeComponent } from './analyze.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [AnalyzeComponent],
  imports: [
    CommonModule,
    AnalyzeRoutingModule,
    HighchartsChartModule
  ]
})
export class AnalyzeModule { }
