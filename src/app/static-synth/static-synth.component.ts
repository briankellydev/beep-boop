import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-static-synth',
  templateUrl: './static-synth.component.html',
  styleUrls: ['./static-synth.component.scss']
})
export class StaticSynthComponent implements OnInit {

  synth: any; // TODO typing?
  filter: any;
  lfo: any;
  volume: any;
  envelope: any;
  volVal = 0;
  oscConfig = {
    oscillator: {
      frequency: 440,
      type: 'triangle',
    },
  }
  envConfig: {
    attack: 0.1,
    decay: 0.1 ,
    sustain: 0.3 ,
    release: 1
  }
  lfoConfig = {
    type: 'sine',
    min: 0,
    max: 1000,
    phase: 0,
    frequency: '4n',
    amplitude: 1
  };
  freqConfig = {
    frequency: 300,
    type: 'lowpass',
    Q: 1
  };

  constructor() { }

  ngOnInit() {
    this.volume = new Tone.Volume(this.volVal).toMaster();
    this.filter = new Tone.Filter({frequency: 300, type: 'lowpass'}).connect(this.volume);
    this.synth = new Tone.Synth(this.oscConfig).connect(this.filter);
    this.lfo = new Tone.LFO(this.lfoConfig).start();
    this.envelope = new Tone.Envelope(this.envConfig).connect(this.filter);
    this.lfo.connect(this.filter.frequency);
    var part = new Tone.Part((time, event) => {
      //the events will be given to the callback with the time they occur
      this.synth.triggerAttackRelease(event.note, event.dur, time)
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : {'4n' : 1, '8n' : 1}, note : 'E4', dur : '8n'},
      { time : '2n', note : 'G4', dur : '16n'},
      { time : {'2n' : 1, '8t' : 1}, note : 'B4', dur : '4n'}]);
    
    //start the part at the beginning of the Transport's timeline
    part.start(0);
    
    //loop the part 3 times
    part.loop = 3;
    part.loopEnd = '1m';
    
  }

  toggle() {
    Tone.Transport.toggle();
  }

  changeVol(vol: number) {
    this.volume.volume.value = vol;
  }

  changeOsc(osc: string) {
    this.synth.oscillator.type = osc;
  }

  

}