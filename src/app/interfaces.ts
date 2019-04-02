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
}

export interface Synth {
}

export interface Oscillator {
  oscillator: {
    frequency: number;
    type: string;
  }
}

export interface Filter {
  type: string;
  frequency: number;
  Q: number;
  rolloff?: number;
  gain?: number;
}