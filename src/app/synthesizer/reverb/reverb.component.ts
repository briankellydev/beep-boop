import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-reverb',
  templateUrl: './reverb.component.html',
  styleUrls: ['./reverb.component.scss']
})
export class ReverbComponent implements OnInit, AfterViewInit {

  @Output() verbChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  decay = 0;
  enabled = false;
  customGeneratedId = this.synthService.generateRandomNumber();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .decay`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.decay,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.decay = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text());
    this.verbChanged.emit(parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text()));
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
