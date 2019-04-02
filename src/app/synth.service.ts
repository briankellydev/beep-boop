import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Synth } from './interfaces';
import { BasicSynth } from './basic-synth.json';

@Injectable({
  providedIn: 'root'
})
export class SynthService {

  synthJson = new BehaviorSubject<Synth>(BasicSynth);

  constructor() { }
}
