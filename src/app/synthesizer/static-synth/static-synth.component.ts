import { Component, OnInit, Input } from '@angular/core';
import * as Tone from 'tone';
import { Oscillator, Envelope, LFO, Filter } from '../../interfaces';

@Component({
  selector: 'app-static-synth',
  templateUrl: './static-synth.component.html',
  styleUrls: ['./static-synth.component.scss']
})
export class StaticSynthComponent implements OnInit {

  @Input() sequence: string[];

  synth: any[]; // TODO typing?
  filter: any;
  lfo: any;
  volume: any;
  envelope: any;
  distortion: any;
  reverb: any;
  delay: any;
  volVal = 0;
  envConfig: Envelope = {
    attack: 0.001,
    decay: 0.001,
    sustain: 0.3,
    release: 0.001
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
    Tone.Transport.bpm.value = 60;
  }

  toggle() {
    var part = new Tone.Sequence((time, note) => {
      //the events will be given to the callback with the time they occur
      this.synth.forEach((synth) => {
        synth.triggerAttackRelease(note, time);
      });
    }, [this.sequence, '16n']);
    
    //start the part at the beginning of the Transport's timeline
    part.start(0);
    
    //loop the part 3 times
    part.loop = 100;
    part.loopEnd = '1m';
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
    this.envelope.decay = env.decay / 1000;
    this.envelope.sustain = env.sustain / 100;
    this.envelope.release = env.release / 1000;
    
    for (let i = 0; i < 3; i++) {
      this.synth[i].envelope.attack = env.attack / 1000;
      this.synth[i].envelope.decay = env.decay / 1000;
      this.synth[i].envelope.sustain = env.sustain / 100;
      this.synth[i].envelope.release = env.release / 1000;
    }
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

  changePort(port: number) {
    this.synth.forEach((synth) => {
      synth.portamento = port / 2;
    });
  }

}