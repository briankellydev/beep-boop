import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import { BehaviorSubject } from 'rxjs';
import { Oscillator, Envelope, LFO, Filter } from '../interfaces';

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
  distortion: any;
  reverb: any;
  delay: any;
  volVal = 0;
  envConfig: Envelope = {
    attack: 0.1,
    decay: 0.1 ,
    sustain: 0.3 ,
    release: 1
  };
  oscConfig: Oscillator = {
    oscillator: {
      frequency: 440,
      type: 'sine',
    },
    envelope: this.envConfig,
  };
  lfoConfig: LFO = {
    type: 'sine',
    min: 0,
    max: 1000,
    phase: 0,
    frequency: 1,
    amplitude: 1
  };
  filterConfig: Filter = {
    frequency: 300,
    type: 'lowpass',
    Q: 0
  };
  distortionConfig = {
    distortion: 0
  };
  reverbConfig = {
    roomSize: 0,
  };
  delayConfig = {
    delayTime: 0,
    feedback: 0,
  };

  constructor() { }

  ngOnInit() {
    this.volume = new Tone.Volume(this.volVal).toMaster();
    this.reverb = new Tone.JCReverb(this.reverbConfig).connect(this.volume);
    this.delay = new Tone.FeedbackDelay(this.delayConfig).connect(this.reverb);
    this.delay.wet.value = 0;
    this.distortion = new Tone.Distortion(this.distortionConfig).connect(this.delay);
    this.distortion.wet.value = 0;
    this.filter = new Tone.Filter(this.filterConfig).connect(this.distortion);
    this.synth = [
      new Tone.Synth(this.oscConfig).connect(this.filter),
      new Tone.Synth(this.oscConfig),
      new Tone.Synth(this.oscConfig),
    ];
    this.lfo = new Tone.LFO(this.lfoConfig);
    this.envelope = new Tone.Envelope(this.envConfig).connect(this.filter);
    this.lfo.connect(this.filter.frequency);
    var part = new Tone.Part((time, event) => {
      //the events will be given to the callback with the time they occur
      this.synth.forEach((synth) => {
        synth.triggerAttackRelease(event.note, event.dur, time);
      });
    }, [{ time : 0, note : 'C4', dur : '4n'},
      { time : {'4n' : 1, '8n' : 1}, note : 'E4', dur : '8n'},
      { time : '2n', note : 'G4', dur : '16n'},
      { time : {'2n' : 1, '8t' : 1}, note : 'B4', dur : '4n'}]);
    
    //start the part at the beginning of the Transport's timeline
    part.start(0);
    
    //loop the part 3 times
    part.loop = 100;
    part.loopEnd = '1m';
    
  }

  toggle() {
    Tone.Transport.toggle();
  }

  changeVol(vol: number) {
    this.volume.volume.value = vol;
  }

  changeOsc(osc: string, num: number) {
    this.synth[num].oscillator.type = osc;
  }

  changeLfo(lfo: LFO) {
    this.lfo.frequency.value = lfo.frequency;
    this.lfo.max = lfo.max;
  }

  toggleDist(enabled: boolean) {
    this.distortion.wet.value = enabled ? 1 : 0;
  }

  changeEnv(env: Envelope) {
    this.envelope.attack = env.attack / 1000;
    this.synth.envelope.attack = env.attack / 1000;
    this.envelope.decay = env.decay / 1000;
    this.synth.envelope.decay = env.decay / 1000;
    this.envelope.sustain = env.sustain / 100;
    this.synth.envelope.sustain = env.sustain / 100;
    this.envelope.release = env.release / 1000;
    this.synth.envelope.release = env.release / 1000;
  }

  changeFilter(filter: Filter) {
    this.filter.frequency.value = filter.frequency;
    this.filter.Q.value = filter.Q;
    this.filter.type = filter.type;
  }

  changeDist(dist: number) {
    this.distortion.distortion = dist;
  }

  toggleLfo(enabled: boolean) {
    if (enabled) {
      this.lfo.start();
    } else {
      this.lfo.stop();
    }
  }

  changeVerb(roomSize: number) {
    this.reverb.roomSize.value = roomSize / 100;
  }

  toggleVerb(enabled: boolean) {
    this.reverb.wet.value = enabled ? 0.5 : 0;
  }

  changeDelay(config: any) {
    this.delay.delayTime.value = config.delayTime / 100;
    this.delay.feedback.value = config.feedback / 100;
  }

  toggleDelay(enabled: boolean) {
    this.delay.wet.value = enabled ? 0.5 : 0;
  }

  toggleOsc(toggled: boolean, num: number) {
    if (toggled) {
      this.synth[num].connect(this.filter);
    } else {
      this.synth[num].disconnect();
    }
  }

}