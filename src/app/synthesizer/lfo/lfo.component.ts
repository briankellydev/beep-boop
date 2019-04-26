import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LFO } from '../../interfaces';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit {

  @Input() lfoConfig: LFO;
  @Output() lfoChanged = new EventEmitter<LFO>();
  @Output() toggleChanged = new EventEmitter<boolean>();

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
