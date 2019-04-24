import { Component, OnInit } from '@angular/core';
import { LFO } from 'src/app/interfaces';

@Component({
  selector: 'app-lfo-tutorial',
  templateUrl: './lfo-tutorial.component.html',
  styleUrls: ['./lfo-tutorial.component.scss']
})
export class LfoTutorialComponent implements OnInit {

  lfo: any;
  synth: any;

  constructor() { }

  ngOnInit() {
    this.synth = new Tone.Synth().toMaster();
    this.synth.oscillator.type = 'sawtooth';
    this.lfo = new Tone.LFO().connect(this.synth.frequency);
    this.lfo.frequency.value = 1;
    this.lfo.max = 0;
    this.lfo.start();
  }

  playPitchModulation() {
    const sine = new Tone.Synth().toMaster();
    sine.oscillator.type = 'sine';
    const lfo = new Tone.LFO().connect(sine.frequency);
    lfo.frequency.value = 1;
    lfo.max = 100;
    lfo.start();
    sine.triggerAttackRelease(440, '4m');
  }

  playFiltModulation() {
    const filter = new Tone.Filter().toMaster();
    filter.frequency.value = 440;
    filter.Q.value = 0;
    filter.type = 'lowpass';
    const sawtooth = new Tone.Synth().connect(filter);
    sawtooth.oscillator.type = 'sawtooth';
    const lfo = new Tone.LFO().connect(filter.frequency);
    lfo.frequency.value = 1;
    lfo.max = 1000;
    lfo.start();
    sawtooth.triggerAttackRelease(440, '4m');
  }

  playWubwub() {
    const filter = new Tone.Filter().toMaster();
    filter.frequency.value = 60;
    filter.Q.value = 0;
    filter.type = 'lowpass';
    const sawtooth = new Tone.Synth().connect(filter);
    sawtooth.oscillator.type = 'sawtooth';
    const lfo = new Tone.LFO().connect(filter.frequency);
    lfo.frequency.value = 8;
    lfo.max = 1000;
    lfo.start();
    sawtooth.triggerAttackRelease(60, '4m');
  }

  changeLfo(lfo: LFO) {
    this.lfo.frequency.value = lfo.frequency;
    this.lfo.max = lfo.max;
    this.lfo.type = lfo.type;
  }

  playMainLfo() {
    this.synth.triggerAttackRelease(440, '4m');
  }

}
