import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, DoCheck } from '@angular/core';
import { Oscillator, Envelope, LFO, Filter, TimelineTrack, Pattern } from '../../interfaces';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { takeUntil, switchMap, tap, filter } from 'rxjs/operators';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-static-synth',
  templateUrl: './static-synth.component.html',
  styleUrls: ['./static-synth.component.scss']
})
export class StaticSynthComponent implements OnInit, OnDestroy {

  @Input() patterns: Pattern[];
  @Input() instanceNumber: number;
  @Output() togglePlay = new EventEmitter<boolean>();

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

  globalPlaying = null;
  parts: any[] = [];
  part: any;
  meter: any;

  private destroy$ = new Subject<any>();
  private tracksIndex: number;
  private tracks: TimelineTrack[];
  private thisNodeGain = new BehaviorSubject<number>(0);

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.meter = new Tone.Meter().toMaster();
    this.synthService.trackMeterLevels.push(this.thisNodeGain);
    this.synthService.tick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.thisNodeGain.next(this.meter.getLevel());
    });
    this.volume = new Tone.Channel(0, 0).connect(this.meter);
    this.reverb = new Tone.JCReverb(this.reverbConfig).connect(this.volume);
    this.reverb.wet.value = 0;
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
    this.envelope = new Tone.ScaledEnvelope(this.envConfig.attack, this.envConfig.decay, this.envConfig.sustain, this.envConfig.release)
      .connect(this.filter.frequency);
    this.envelope.min = 0;
    this.envelope.max = 500;
    this.lfo.connect(this.filter.frequency);

    this.synthService.tracks.pipe(
      takeUntil(this.destroy$),
      switchMap((tracks: TimelineTrack[]) => {
        this.tracks = tracks;
        this.tracksIndex = tracks.findIndex((track) => {
          return track.instanceNumber === this.instanceNumber;
        });
        this.volume.volume.value = this.tracks[this.tracksIndex].volume;
        this.volume.pan.value = this.tracks[this.tracksIndex].pan / 100;
        this.volume.mute = this.tracks[this.tracksIndex].mute;
        this.volume.solo = this.tracks[this.tracksIndex].solo;
        return this.synthService.playing.pipe(takeUntil(this.destroy$));
      }),
      tap((isPlaying: boolean) => {
        this.globalPlaying = isPlaying;
        this.toggle();
      })
    ).subscribe();
    this.synthService.midiMessage.pipe(takeUntil(this.destroy$)).subscribe((midiMessage: any) => {
      if (midiMessage && this.instanceNumber === this.synthService.instanceMidiActivated) {
        this.synth.forEach((synth: any) => {
          // If it's not a note off message
          // Eventually velocity and duration will be implemented
          if (midiMessage.data[2] !== 127) {
            synth.triggerAttackRelease(Tone.Midi(midiMessage.data[1]).toFrequency(), '16n');
          }
        });
        this.envelope.triggerAttackRelease('16n');
      }
    });
  }

  ngOnDestroy() {
    this.synth.forEach((synth: any) => {
      synth.dispose();
    });
    this.synth = [];
    this.volume.dispose();
    this.reverb.dispose();
    this.delay.dispose();
    this.distortion.dispose();
    this.filter.dispose();
    this.lfo.dispose();
    this.envelope.dispose();
    this.parts.forEach((part: any) => {
      part.dispose();
    });
    this.destroy$.next();
  }

  toggle() {
    this.parts.forEach((part: any) => {
      part.dispose();
    });
    this.parts = [];
    this.tracks[this.tracksIndex].patternPerMeasure.forEach((pattern: number, index: number) => {
      if (pattern && pattern > 0) {
        this.parts.push(new Tone.Sequence((time, note) => {
          // the events will be given to the callback with the time they occur
          this.synth.forEach((synth) => {
            synth.triggerAttackRelease(note, '16n', time);
          });
          this.envelope.triggerAttackRelease('16n');
        }, this.patterns[pattern - 1].sequence, '16n'));
        this.parts[this.parts.length - 1].loop = false;
        if (this.globalPlaying) {
          this.parts[this.parts.length - 1].start(`${index}m`);
        } else {
          this.parts[this.parts.length - 1].stop(`${index + 1}m`);
        }
      }
    });
  }

  changeOsc(osc: string, num: number) {
    this.synth[num].oscillator.type = osc;
  }

  changeLfo(lfo: LFO) {
    this.lfo.frequency.value = lfo.frequency;
    this.lfo.max = lfo.max;
    this.lfo.type = lfo.type;
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
    this.reverb.roomSize.value = roomSize / 200;
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