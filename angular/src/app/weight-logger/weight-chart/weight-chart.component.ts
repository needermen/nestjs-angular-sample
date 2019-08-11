import {Component, OnInit} from '@angular/core';
import {WeightLogService} from '../services/weight-log.service';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnInit {

  constructor(private weightLogService: WeightLogService) {
  }

  selectedFilter: string = 'week';

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.loadChart();
  }

  data: any;

  weekdays = ['Monday', 'tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  sessions = ['Spring', 'Summer', 'Autumn', 'Winter'];


  loadChart() {
    switch (this.selectedFilter) {
      case 'week':
        this.loadLastWeekChart();
        break;
      case 'month':
        this.loadLastMonthChart();
        break;
      case 'block':
        this.loadLastBlockChart();
        break;
      case 'year':
        this.loadLastYearChart();
        break;
    }
  }

  loadLastWeekChart() {
    this.data = {
      labels: this.weekdays,
      datasets: [
        {
          label: 'Last 7 Days',
          data: [65, 59, 80, 81, null, 55, 40]
        }
      ]
    };
  }

  loadLastMonthChart() {
    this.data = {
      labels: ['week 1', 'week 2', '', 'week 3', 'week 4'],
      datasets: [
        {
          label: 'Last Month',
          data: [65, 59, 80, 47, 81]
        }
      ]
    };
  }

  loadLastBlockChart() {
    this.data = {
      labels: this.months.slice(0, 3),
      datasets: [
        {
          label: 'Last Block',
          data: [65, 59, 80]
        }
      ]
    };
  }

  loadLastYearChart() {
    this.data = {
      labels: this.sessions,
      datasets: [
        {
          label: 'Last Year',
          data: [65, 59, 80, 81]
        }
      ]
    };
  }

  ngOnInit() {
    this.weightLogService.getAll().subscribe(value => {
      this.loadChart();
    });
  }

}
