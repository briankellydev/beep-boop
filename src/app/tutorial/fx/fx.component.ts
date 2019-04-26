import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fx',
  templateUrl: './fx.component.html',
  styleUrls: ['./fx.component.scss']
})
export class FxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playReverb() {
    const reverb = new Tone.JCReverb({roomSize: 0.9}).toMaster();
    reverb.wet.value = 1;
    const synth = new Tone.Synth().connect(reverb);
    synth.oscillator.type = 'sawtooth';
    const part = new Tone.Part(function(time, event){
      // the events will be given to the callback with the time they occur
      synth.triggerAttackRelease(event.note, event.dur, time);
      if (event.time === '1m') {
        Tone.Transport.stop();
        synth.dispose();
        part.dispose();
      }
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : '4n', note : 'E4', dur : '4n'},
      { time : '2n', note : 'G4', dur : '4n'},
      { time : '1m', note : 'C4', dur : '4n'}])
    part.start(0);
    Tone.Transport.start();
  }

  playDelay() {
    const delay = new Tone.FeedbackDelay({delayTime: 0.5, feedback: 0.5}).toMaster();
    const synth = new Tone.Synth().connect(delay);
    synth.oscillator.type = 'sawtooth';
    const part = new Tone.Part(function(time, event){
      // the events will be given to the callback with the time they occur
      synth.triggerAttackRelease(event.note, event.dur, time);
      if (event.time === '1m') {
        Tone.Transport.stop();
        synth.dispose();
        part.dispose();
      }
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : '4n', note : 'E4', dur : '4n'},
      { time : '2n', note : 'G4', dur : '4n'},
      { time : '1m', note : 'C4', dur : '4n'}])
    part.start(0);
    Tone.Transport.start();
  }

  playDistortion() {
    const distortion = new Tone.Distortion({distortion: 10}).toMaster();
    const synth = new Tone.Synth().connect(distortion);
    synth.oscillator.type = 'sawtooth';
    const part = new Tone.Part(function(time, event){
      // the events will be given to the callback with the time they occur
      synth.triggerAttackRelease(event.note, event.dur, time);
      if (event.time === '1m') {
        Tone.Transport.stop();
        synth.dispose();
        part.dispose();
      }
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : '4n', note : 'E4', dur : '4n'},
      { time : '2n', note : 'G4', dur : '4n'},
      { time : '1m', note : 'C4', dur : '4n'}])
    part.start(0);
    Tone.Transport.start();
  }

}
