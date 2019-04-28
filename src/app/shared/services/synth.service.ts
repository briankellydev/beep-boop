import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TimelineTrack, Instrument } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SynthService {

  instanceToDelete = new BehaviorSubject<number>(null);
  playing = new BehaviorSubject<boolean>(false);
  tracks = new BehaviorSubject<TimelineTrack[]>([]);
  numberOfMeasures = 20;
  numberOfStepsPerMeasure = new BehaviorSubject<number>(16);
  trackMeterLevels = new BehaviorSubject<number[]>([]);
  tick = new BehaviorSubject<number>(null);
  recorder: any;
  midiMessage = new Subject<any>();
  instanceMidiActivated = 0;
  instruments = new BehaviorSubject<Instrument[]>([]);

  constructor() {}

  calculateNumberOfStepsPerMeasure(numerator: number, denominator: number) {
    return numerator * (16 / denominator);
  }

  createNullSequence(numOfSteps: number, numberOfMeasures: number) {
    const nullSequence = [];
    for (let i = 0; i < numOfSteps * numberOfMeasures; i++) {
      nullSequence.push(null);
    }
    return nullSequence;
  }

  createFalseSequence(numOfSteps: number, numberOfMeasures: number) {
    const falseSequence = [];
    for (let i = 0; i < numOfSteps * numberOfMeasures; i++) {
      falseSequence.push(false);
    }
    return falseSequence;
  }

}
