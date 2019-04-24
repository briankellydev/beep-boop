import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LFO } from '../../interfaces';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    
  }

  changeDepth(depth: number) {
    this.lfoConfig.max = depth;
    this.lfoChanged.emit(this.lfoConfig);
  }

  changeFreq(freq: number) {
    this.lfoConfig.frequency = freq;
    this.lfoChanged.emit(this.lfoConfig);
  }

  selectOsc(osc: string) {
    this.oscillatorSelected = osc;
    this.lfoConfig.type = osc;
    this.lfoChanged.emit(this.lfoConfig);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
