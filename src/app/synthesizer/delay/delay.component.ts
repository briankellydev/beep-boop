import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit, AfterViewInit {


  @Output() delayChanged = new EventEmitter<any>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  delayConfig = {
    delayTime: 0,
    feedback: 0,
  };
  enabled = false;
  customGeneratedId = this.synthService.generateRandomNumber();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .time`).roundSlider({
      radius: 40,
      circleShape: 'default',
      sliderType: 'min-range',
      showTooltip: true,
      value: this.delayConfig.delayTime,
      min: 0,
      max: 100
    });
    $(`#${this.customGeneratedId} .feedback`).roundSlider({
      radius: 40,
      circleShape: 'default',
      sliderType: 'min-range',
      showTooltip: true,
      value: this.delayConfig.feedback,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.delayConfig.delayTime = parseInt($(`#${this.customGeneratedId} .time .rs-tooltip`).eq(0).text());
    this.delayConfig.feedback = parseInt($(`#${this.customGeneratedId} .feedback .rs-tooltip`).eq(0).text());
    this.delayChanged.emit(this.delayConfig);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
