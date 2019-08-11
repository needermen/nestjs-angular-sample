import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WeightLoggerComponent} from './weight-logger.component';

const routes: Routes = [
  {path: 'weightlogger', component: WeightLoggerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightLoggerRoutingModule {
}
