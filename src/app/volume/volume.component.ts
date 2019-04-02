import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  @Output() volChanged = new EventEmitter<number>();
  vol = 100

  constructor() { }

  ngOnInit() {
    $(".volume-slider").roundSlider({
      radius: 80,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.vol / 100,
      min: -50,
      max: 6,
      change: 'changes'
    });
  }

  changes() {
    this.vol = parseInt($(".rs-tooltip").text());
    this.volChanged.emit(this.vol);
  }

}