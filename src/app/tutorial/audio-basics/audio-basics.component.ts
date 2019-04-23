import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-basics',
  templateUrl: './audio-basics.component.html',
  styleUrls: ['./audio-basics.component.scss']
})
export class AudioBasicsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playSine() {
    const sine = new Tone.Synth().toMaster();
    sine.oscillator.type = 'sine';
    sine.triggerAttackRelease(440, '1m');
  }

  playSquare() {
    const sine = new Tone.Synth().toMaster();
    sine.oscillator.type = 'square';
    sine.triggerAttackRelease(440, '1m');
  }

  playTriangle() {
    const sine = new Tone.Synth().toMaster();
    sine.oscillator.type = 'triangle';
    sine.triggerAttackRelease(440, '1m');
  }

  playSawtooth() {
    const sine = new Tone.Synth().toMaster();
    sine.oscillator.type = 'sawtooth';
    sine.triggerAttackRelease(440, '1m');
  }

}
