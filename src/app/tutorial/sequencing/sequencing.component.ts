import { Component, OnInit } from '@angular/core';
import { Pattern } from 'src/app/interfaces';

@Component({
  selector: 'app-sequencing',
  templateUrl: './sequencing.component.html',
  styleUrls: ['./sequencing.component.scss']
})
export class SequencingComponent implements OnInit {

  patterns: Pattern[];

  constructor() { }

  ngOnInit() {
  }

  playSynth() {
    const synth = new Tone.Synth().toMaster();
    synth.oscillator.type = 'sawtooth';
    const part = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, '16n', time);
    }, this.patterns[0].sequence, '16n');
    part.loop = false;
    part.start(0);
    Tone.Transport.start();
    Tone.Transport.scheduleOnce(() => {
      Tone.Transport.stop();
      part.dispose();
      synth.dispose();
    }, '1m', '1m');
  }

  setPattern(patterns: Pattern[]) {
    this.patterns = patterns;
  }

}
