import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LFO } from '../interfaces';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit {

  @Output() lfoChanged = new EventEmitter<LFO>();

  lfoConfig: LFO = {
    type: 'sine',
    min: 0,
    max: 1000,
    phase: 0,
    frequency: 1,
    amplitude: 1
  };
  constructor() { }

  ngOnInit() {
    $(".depth").roundSlider({
      radius: 80,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.lfoConfig.max,
      min: 0,
      max: 1000
    });
    $(".freq").roundSlider({
      radius: 80,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.lfoConfig.frequency,
      min: 0,
      max: 30
    });
  }

  changes() {
    this.lfoConfig.max = parseInt($(".rs-tooltip").eq(0).text());
    this.lfoConfig.frequency = parseInt($(".rs-tooltip").eq(1).text()); // TODO map to time vals
    console.log(this.lfoConfig);
    this.lfoChanged.emit(this.lfoConfig);
  }

}
