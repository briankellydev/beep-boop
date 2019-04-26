import { Component, OnInit } from '@angular/core';
import { Envelope } from 'src/app/interfaces';

@Component({
  selector: 'app-envelope-tutorial',
  templateUrl: './envelope-tutorial.component.html',
  styleUrls: ['./envelope-tutorial.component.scss']
})
export class EnvelopeTutorialComponent implements OnInit {

  envelope: any;
  synth: any;
  filter: any;

  constructor() { }

  ngOnInit() {
    this.filter = new Tone.Filter().toMaster();
    this.synth = new Tone.Synth().connect(this.filter);
    this.synth.oscillator.type = 'sawtooth';
    this.synth.envelope.sustain = 1;
    this.envelope = new Tone.ScaledEnvelope(2, 2, 0.5, 2).connect(this.filter.frequency);
    this.envelope.min = 0;
    this.envelope.max = 1000;
  }

  playPitchEnv() {
    const synth = new Tone.Synth().toMaster();
    synth.oscillator.type = 'sine';
    const envelope = new Tone.ScaledEnvelope(2, 2, 0.5, 2).connect(synth.frequency);
    envelope.min = 0;
    envelope.max = 1000;
    synth.envelope.sustain = 1;
    synth.triggerAttackRelease(440, '4m');
    envelope.triggerAttackRelease('4m');
  }

  playVolEnv() {
    const synth = new Tone.Synth().toMaster();
    synth.oscillator.type = 'sine';
    synth.envelope.attack = 2;
    synth.envelope.decay = 2;
    synth.envelope.sustain = 0.5;
    synth.envelope.release = 2;
    synth.triggerAttackRelease(440, '4m');
  }

  playMultiNoteEnv() {
    const synth = new Tone.Synth().toMaster();
    synth.oscillator.type = 'sine';
    synth.envelope.attack = 0.5;
    synth.envelope.decay = 0.1;
    synth.envelope.sustain = 0.5;
    synth.envelope.release = 1;
    const part = new Tone.Part(function(time, event){
      // the events will be given to the callback with the time they occur
      synth.triggerAttackRelease(event.note, event.dur, time);
      if (event.time === '1m') {
        Tone.Transport.stop();
      }
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : '4n', note : 'E4', dur : '4n'},
      { time : '2n', note : 'G4', dur : '4n'},
      { time : '1m', note : 'C4', dur : '4n'}])
    part.start(0);
    Tone.Transport.start();
  }

  changeEnv(env: Envelope) {
    this.envelope.attack = env.attack / 1000;
    this.envelope.decay = env.decay / 1000;
    this.envelope.sustain = env.sustain / 100;
    this.envelope.release = env.release / 1000;
    this.synth.envelope.release = env.release / 1000;
  }

  playMainEnv() {
    this.synth.triggerAttackRelease(440, '4m');
    this.envelope.triggerAttackRelease('4m');
  }

}
