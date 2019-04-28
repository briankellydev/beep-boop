import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/app/interfaces';

@Component({
  selector: 'app-filters-tutorial',
  templateUrl: './filters-tutorial.component.html',
  styleUrls: ['./filters-tutorial.component.scss']
})
export class FiltersTutorialComponent implements OnInit {

  synth: any;
  filter: any;
  filterConfig: Filter = {
    frequency: 300,
    type: 'lowpass',
    Q: 0
  };

  constructor() { }

  ngOnInit() {
    this.filter = new Tone.Filter().toMaster();
    this.synth = new Tone.Synth().connect(this.filter);
    this.synth.oscillator.type = 'sawtooth';
  }

  playSawtooth() {
    this.synth.triggerAttackRelease(440, '3m');
  }

  changeFilter(filter: Filter) {
    this.filter.frequency.value = filter.frequency;
    this.filter.Q.value = filter.Q;
    this.filter.type = filter.type;
  }

}
