import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Filter } from '../../interfaces';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {

  @Output() filterChanged = new EventEmitter<Filter>();

  filterConfig: Filter = {
    frequency: 300,
    type: 'lowpass',
    Q: 0
  };
  typeSelected = 'lowpass';
  customGeneratedId = this.synthService.generateRandomNumber();
  constructor(private synthService: SynthService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .q`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.filterConfig.Q,
      min: 0,
      max: 10
    });
    $(`#${this.customGeneratedId} .filt-freq`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.filterConfig.frequency,
      min: 0,
      max: 20000
    });
  }

  changes() {
    this.filterConfig.frequency = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text());
    this.filterConfig.Q = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(1).text());
    this.filterConfig.type = this.typeSelected;
    this.filterChanged.emit(this.filterConfig);
  }

  selectType(type: string) {
    this.typeSelected = type;
    this.changes();
  }
}
