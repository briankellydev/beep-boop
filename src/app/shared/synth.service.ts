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

  constructor() { }

  generateRandomNumber() {
    return Math.round(Math.random() * 10000);
  }

  calculateNumberOfStepsPerMeasure(numerator: number, denominator: number) {
    return numerator * (16 / denominator);
  }

  createNullSequence(numOfSteps: number) {
    const nullSequence = [];
    for (let i = 0; i < numOfSteps; i++) {
      nullSequence.push(null);
    }
    return nullSequence;
  }

  createFalseSequence(numOfSteps: number) {
    const falseSequence = [];
    for (let i = 0; i < numOfSteps; i++) {
      falseSequence.push(false);
    }
    return falseSequence;
  }

}
