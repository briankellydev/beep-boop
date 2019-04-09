import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SynthService {

  // synthJson = new BehaviorSubject<Synth>(BasicSynth);
  instanceToDelete = new BehaviorSubject<number>(null);

  constructor() { }
}
