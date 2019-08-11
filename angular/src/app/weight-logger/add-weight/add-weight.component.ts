import {Component, OnInit} from '@angular/core';
import {WeightLogService} from '../services/weight-log.service';
import {calculatekg, calculatelbs, WeightLogDto} from '../models/weight-log.dto';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss']
})
export class AddWeightComponent implements OnInit {
  weight: number;

  selectedDay: string = 'none';
  measureSelected: string = 'none';

  currentWeightLof: WeightLogDto;

  uploadUrl = `${environment.baseUrl}/weightlog/upload`;
  uploadsUrl = `${environment.baseUrl}/weightlog/uploads`;

  constructor(private weightLogService: WeightLogService) {
  }

  ngOnInit() {
  }

  selectDay(value) {
    this.selectedDay = value;
    this.weightLogService.getByDate(this.calculateDay()).subscribe((value) => {
      this.currentWeightLof = value;
      this.reloadValue();
    });
  }

  selectMeasure(measureValue) {
    this.measureSelected = measureValue;
    this.reloadValue();
  }

  reloadValue() {
    if (this.currentWeightLof) {
      if (this.measureSelected == 'kg') {
        this.weight = this.currentWeightLof.kg;
      } else if (this.measureSelected == 'lbs') {
        this.weight = calculatelbs(this.currentWeightLof.kg);
      }
    } else {
      this.weight = null;
    }
  }

  saveWeightLog() {
    if (this.selectedDay == 'none') {
      return;
    }
    this.weightLogService.put(this.calculateWeightLog()).subscribe();
  }

  calculateDay() {
    let date = new Date();
    if (this.selectedDay == 'yesterday') {
      date.setDate(date.getDate() - 1);
    }
    return date;
  }

  calculateWeightLog(): WeightLogDto {
    if (this.measureSelected == 'kg') {
      return {date: this.calculateDay(), kg: this.weight};
    }
    if (this.measureSelected == 'lbs') {
      return {date: this.calculateDay(), kg: calculatekg(this.weight)};
    }
  }
}
