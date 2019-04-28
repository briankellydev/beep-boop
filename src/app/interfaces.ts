
export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface LFO {
  type: string;
  min: number;
  max: number;
  phase: number;
  frequency: string | number;
  amplitude: number;
  enabled?: boolean;
}

export interface Oscillator {
  oscillator: {
    frequency: number;
    type: string;
  };
  envelope?: Envelope;
  enabled?: boolean;
}

export interface Filter {
  type: string;
  frequency: number;
  Q: number;
  rolloff?: number;
  gain?: number;
}

export interface NoteRow {
  note: string;
  octave: string;
  sequence: boolean[];
}

export interface Pattern {
  num: number;
  lowestNote?: string;
  lowestOctave?: string;
  numberOfMeasures: number;
  sequence: string[];
}

export interface PolyPattern {
  num: number;
  numberOfMeasures: number;
  sequence: Array<string[]>
}

export interface DrumMachineSample {
  sampleName: string;
  possibleSamples: string[];
  trackName: string;
}

export interface DrumRow extends NoteRow {
  drum: string;
}

export interface TimelineTrack {
  instrument: string;
  instanceNumber: number;
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  collapsed: boolean;
  patternPerMeasure: number[];
  patternLengths: number[];
}

export interface BeepBlaster {
  envConfig: Envelope;
  oscillators: Oscillator[];
  lfoConfig: LFO;
  filterConfig: Filter;
  distortionConfig: Distortion;
  reverbConfig: Reverb;
  delayConfig: Delay;
  track: TimelineTrack;
  patterns: Pattern[];
}

export interface Distortion {
  distortion: number;
  enabled: boolean;
}

export interface BoomBoom {
  kit: string;
  patterns: PolyPattern[];
  track: TimelineTrack;
}

export interface Reverb {
  roomSize: number;
  enabled: boolean;
}

export interface Delay {
  delayTime: number;
  feedback: number;
  enabled: boolean;
}

export interface Instrument {
  name: string;
  instrument: BeepBlaster | BoomBoom;
}
