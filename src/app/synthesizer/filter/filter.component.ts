import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterChanged = new EventEmitter<Filter>();

  filterConfig: Filter = {
    frequency: 300,
    type: 'lowpass',
    Q: 0
  };
  typeSelected = 'lowpass';
  constructor() { }

  ngOnInit() {
    $(".q").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.filterConfig.Q,
      min: 0,
      max: 10
    });
    $(".filt-freq").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.filterConfig.frequency,
      min: 0,
      max: 20000
    });
  }

  changes() {
    this.filterConfig.frequency = parseInt($(".filter .rs-tooltip").eq(0).text());
    this.filterConfig.Q = parseInt($(".filter .rs-tooltip").eq(1).text()); // TODO map to time vals
    this.filterConfig.type = this.typeSelected;
    this.filterChanged.emit(this.filterConfig);
  }

  selectType(type: string) {
    this.typeSelected = type;
    this.changes();
  }
}
