import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-distortion',
  templateUrl: './distortion.component.html',
  styleUrls: ['./distortion.component.scss']
})
export class DistortionComponent implements OnInit {

  @Output() distChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  
  distortion = 0;
  enabled = false;

  constructor() { }

  ngOnInit() {
    $(".dist .distortion").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.distortion,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.distortion = parseInt($(".dist .rs-tooltip").eq(0).text());
    this.distChanged.emit(parseInt($(".dist .rs-tooltip").eq(0).text()) / 100);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
