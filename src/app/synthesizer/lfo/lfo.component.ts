import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { LFO } from '../../interfaces';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit, AfterViewInit {

  @Output() lfoChanged = new EventEmitter<LFO>();
  @Output() toggleChanged = new EventEmitter<boolean>();

  lfoConfig: LFO = {
    type: 'sine',
    min: 0,
    max: 1000,
    phase: 0,
    frequency: 1,
    amplitude: 1
  };
  oscillatorSelected = 'sine';
  enabled = false;
  customGeneratedId = this.synthService.generateRandomNumber();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .depth`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.lfoConfig.max + ' Hz',
      min: 0,
      max: 5000
    });
    $(`#${this.customGeneratedId} .lfo-freq`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.lfoConfig.frequency,
      min: 0,
      max: 30
    });
  }

  changes() {
    this.lfoConfig.max = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text());
    this.lfoConfig.frequency = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(1).text()); // TODO map to time vals
    this.lfoConfig.type = this.oscillatorSelected;
    this.lfoChanged.emit(this.lfoConfig);
  }

  selectOsc(osc: string) {
    this.oscillatorSelected = osc;
    this.changes();
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
