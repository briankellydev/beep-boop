import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reverb',
  templateUrl: './reverb.component.html',
  styleUrls: ['./reverb.component.scss']
})
export class ReverbComponent implements OnInit {

  @Output() verbChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  decay = 0;
  enabled = false;

  constructor() { }

  ngOnInit() {
    $(".reverb .decay").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.decay,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.decay = parseInt($(".reverb .rs-tooltip").eq(0).text());
    this.verbChanged.emit(parseInt($(".reverb .rs-tooltip").eq(0).text()));
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
