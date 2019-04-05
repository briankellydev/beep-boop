import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  @Input() playing: boolean;
  @Output() volChanged = new EventEmitter<number>();
  @Output() playClicked = new EventEmitter<any>();
  vol = 100

  constructor() { }

  ngOnInit() {
    $(".volume-slider").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.vol / 100,
      min: -50,
      max: 6
    });
  }

  changes() {
    this.vol = parseInt($(".volume .rs-tooltip").text());
    this.volChanged.emit(this.vol);
  }

  play() {
    this.playClicked.emit();
  }

}
