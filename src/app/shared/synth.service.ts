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
  numberOfMeasures = 50;

  constructor() { }
}
