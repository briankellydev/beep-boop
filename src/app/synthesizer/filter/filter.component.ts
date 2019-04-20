import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Filter } from '../../interfaces';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterChanged = new EventEmitter<Filter>();

  filterConfig: Filter = {
    frequency: 300,
    type: 'lowpass',
    Q: 0
  };
  typeSelected = 'lowpass';
  constructor() { }

  ngOnInit() {
    
  }

  changeFreq(freq: number) {
    this.filterConfig.frequency = freq;
    this.filterChanged.emit(this.filterConfig);
  }

  changeQ(q: number) {
    this.filterConfig.Q = q;
    this.filterChanged.emit(this.filterConfig);
  }


  selectType(type: string) {
    this.typeSelected = type;
    this.filterConfig.type = this.typeSelected;
    this.filterChanged.emit(this.filterConfig);
  }
}
