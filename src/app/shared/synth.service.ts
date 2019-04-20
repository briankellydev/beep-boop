import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimelineTrack } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SynthService {

  instanceToDelete = new BehaviorSubject<number>(null);
  playing = new BehaviorSubject<boolean>(false);
  tracks = new BehaviorSubject<TimelineTrack[]>([]);
  numberOfMeasures = 20;
  numberOfStepsPerMeasure = new BehaviorSubject<number>(16);
  trackMeterLevels: BehaviorSubject<number>[] = [];
  tick = new BehaviorSubject<number>(null);
  dest = Tone.context.createMediaStreamDestination();
  recorder: any;
  chunks = [];

  constructor() {
      // Code in the constructor is a no-no in angular, but with tone there aren't a lot of choices here
      // this.recorder = new MediaRecorder(this.dest.stream);
   }

  generateRandomNumber() {
    return Math.round(Math.random() * 10000);
  }

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
