import { Injectable } from '@angular/core';
import { Envelope, LFO } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

 /* createContext() {
    return new AudioContext();
  }

  createGain(context: AudioContext) {
    return context.createGain();
  }

  createOscillator(context: AudioContext, freq: number, type: OscillatorType): OscillatorNode {
    const osc = context.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    return osc;
  }

  createAmplitudeEnvelope(gain: GainNode, envelope: Envelope, context: AudioContext, maxAmplitude: number) {
    gain.gain.value = 0.00001;
    gain.gain.exponentialRampToValueAtTime(maxAmplitude, context.currentTime + envelope.A);
    gain.gain.exponentialRampToValueAtTime(envelope.S * maxAmplitude, context.currentTime + envelope.A + envelope.D);
    return gain;
  }

  createFilterEnvelope(filter: BiquadFilterNode, envelope: Envelope, context: AudioContext, maxAmplitude: number, property: string) {
    filter[property].setValueAtTime(1, context.currentTime);
    filter[property].exponentialRampToValueAtTime(maxAmplitude, context.currentTime + envelope.A);
    filter[property].exponentialRampToValueAtTime(envelope.S * maxAmplitude, context.currentTime + envelope.A + envelope.D);
    return filter;
  }

  createOscFreqEnvelope(osc: OscillatorNode, envelope: Envelope, context: AudioContext, maxAmplitude: number) {
    osc.frequency.setValueAtTime(1, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(maxAmplitude, context.currentTime + envelope.A);
    osc.frequency.exponentialRampToValueAtTime(envelope.S * maxAmplitude, context.currentTime + envelope.A + envelope.D);
    return osc;
  }

  createFilter(freq: number, q: number, type: BiquadFilterType, context: AudioContext) {
    const filter = context.createBiquadFilter();
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.value = freq;
    return filter;
  }

  createControlOscillator(context: AudioContext, lfoConfig: LFO) {
    const modOsc = this.createOscillator(context, lfoConfig.frequency, lfoConfig.waveform);
    const modGain = this.createGain(context);
    modGain.gain.value = lfoConfig.gain;
    modOsc.connect(modGain);
    modOsc.start();
    return modGain;
  }*/
}
