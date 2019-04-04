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
  envelope?: Envelope;
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
};