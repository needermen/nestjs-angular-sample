import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WeightLoggerRoutingModule} from './weight-logger-routing.module';
import {WeightChartComponent} from './weight-chart/weight-chart.component';
import {AddWeightComponent} from './add-weight/add-weight.component';
import {WeightLoggerComponent} from './weight-logger.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {WeightLogService} from './services/weight-log.service';
import {FormsModule} from '@angular/forms';

import {FileUploadModule} from 'primeng/fileupload';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [WeightChartComponent, AddWeightComponent, WeightLoggerComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    FileUploadModule,
    ChartModule,
    WeightLoggerRoutingModule
  ],
  providers: [
    WeightLogService
  ]
})
export class WeightLoggerModule {
}
