import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {


  @Output() delayChanged = new EventEmitter<any>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  delayConfig = {
    delayTime: 0,
    feedback: 0,
  };
  enabled = false;

  constructor() { }

  ngOnInit() {
    $(".delay .time").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.delayConfig.delayTime,
      min: 0,
      max: 100
    });
    $(".delay .feedback").roundSlider({
      radius: 40,
      circleShape: "default",
      sliderType: "min-range",
      showTooltip: true,
      value: this.delayConfig.feedback,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.delayConfig.delayTime = parseInt($(".time .rs-tooltip").eq(0).text());
    this.delayConfig.feedback = parseInt($(".feedback .rs-tooltip").eq(0).text());
    this.delayChanged.emit(this.delayConfig);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
