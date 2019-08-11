import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './weight-logger.component.html'
})
export class WeightLoggerComponent implements OnInit {

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Weight Logger');
  }

}
